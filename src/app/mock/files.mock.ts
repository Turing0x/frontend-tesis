import { Service } from '../interfaces/service_file.interface';

export const filesMock: Service[] = [
  {
    name: 'confbasica',
    displayName: 'Configuración básica',
    files: [
      {
        mandatory: true,
        name: 'confautbasica.sh',
        content: `!/bin/bash
# -*- ENCODING: UTF-8 -*-
cp -i hostname /etc/ #
cp -i hosts /etc/ #
cp -i resolv.conf /etc/ #
cp -i interfaces /etc/network/ #
/etc/init.d/networking restart #
ifconfig #
reboot #
exit #
`,
        parameters: [],
      },
      {
        mandatory: false,
        name: 'hostname',
        content: ``,
        parameters: [],
      },
      {
        mandatory: false,
        name: 'hosts',
        content: `127.0.0.1	localhost
127.0.1.1	bender.robot.zone.cu	bender

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
`,
        parameters: [],
      },
      {
        mandatory: false,
        name: 'interfaces',
        content: `# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto eth0
allow-hotplug eth0
iface eth0 inet dhcp

auto eth1
allow-hotplug eth1
iface eth1 inet static
address 192.168.11.100
netmask 255.255.255.0
network 192.168.11.0
`,
        parameters: [],
      },
      {
        mandatory: false,
        name: 'resolv.conf',
        content: `domain robot.zone.cu
search robot.zone.cu
nameserver 127.0.0.1
`,
        parameters: [],
      },
    ],
  },
  {
    name: 'bind',
    displayName: 'Bind',
    files: [
      {
        mandatory: true,
        name: 'confautdns.sh',
        content: `#!/bin/bash
# -*- ENCODING: UTF-8 -*-
cp -i en_etc.bind/* /etc/bind/ #
cp -f en_var.cache.bind/* /var/cache/bind/ #
named-checkzone 192.168.11.in-addr.arpa /var/cache/bind/192.168.11.rev #
named-checkconf -z #
named-checkconf -p #
service bind9 restart #
exit #
`,
        parameters: [],
      },
      {
        mandatory: false,
        name: 'named.conf',
        folder: 'en_etc.bind',
        content: `// This is the primary configuration file for the BIND DNS server named.
//
// Please read /usr/share/doc/bind9/README.Debian.gz for information on the 
// structure of BIND configuration files in Debian, *BEFORE* you customize 
// this configuration file.
//
// If you are just adding zones, please do that in /etc/bind/named.conf.local

include "/etc/bind/named.conf.options";
include "/etc/bind/named.conf.local";
include "/etc/bind/named.conf.default-zones";

acl "secure" {
	127.0.0.0/8;any;
	
};
`,
        parameters: [],
      },
      {
        mandatory: false,
        name: 'named.conf.local',
        folder: 'en_etc.bind',
        content: `//
// Do any local configuration here
//

// Consider adding the 1918 zones here, if they are not used in your
// organization
//include "/etc/bind/zones.rfc1918";

zone "192.168.11.in-addr.arpa"{
	type master;
	file "192.168.11.rev";
};`,
        parameters: [],
      },
      {
        mandatory: false,
        name: 'robot.zone.cu.db',
        folder: 'en_var.cache.bind',
        content: `;
; BIND data file for local loopback interface
;
$TTL	604800
@	IN	SOA robot.zone.cu. mailadmin.robot.zone.cu. (
			      2		; Serial
			 604800		; Refresh
			  86400		; Retry
			2419200		; Expire
			 604800 )	; Negative Cache TTL
;

@		IN	MX	10 mail.robot
names1		IN	A	192.168.11.100
names2		IN	A	192.168.11.101
correo		IN	CNAME	mail.robot.zone.cu.
novedades	IN	A	192.168.11.100
actualidad	IN	A	192.168.11.100
ciencia		IN	A	192.168.11.100
investigacion	IN	A	192.168.11.100
`,
        parameters: [],
      },
      {
        mandatory: false,
        name: 'named.conf.options',
        folder: 'en_etc.bind',
        content: `options {
	directory "/var/cache/bind";
	recursion yes;
	allow-query {secure;};
	forwarders {10.0.0.3;};
	forward only;
	dnssec-enable yes;
	dnssec-validation yes;
	auth-nxdomain no;    # conform to RFC1035
	listen-on-v6 {any;};
};

`,
        parameters: [],
      },
    ],
  },
  {
    name: 'compartir',
    displayName: 'Compartir',
    files: [
      {
        mandatory: true,
        name: 'confautsamba.sh',
        content: `#!/bin/bash
# -*- ENCODING: UTF-8 -*-
cp -i en_etc.samba/* /etc/samba/ #
useradd -m ingeniero #
useradd -m tecnico #
groupadd trabajadores #
useradd -g trabajadores ingeniero
useradd -g trabajadores tecnico
passwd root #
passwd -a docencia #
smbpasswd -a tecnico #
#Evitar que los usuarios inicien sesion remota por ssh
cp en_etc.ssh/* /etc/ssh/sshd_config #
mkdir -p /home/documentos/publicaciones #
ls -l /home/documentos/publicaciones #
mkdir -p /home/documentos/proyectos #
ls -l /home/documentos/proyectos #
chown -R tecnico:trabajadores /home/documentos
chmod -R 777 /home/documentos
ls -l /home/documentos #
testparm #
service samba reload #
smbclient -L localhost -U% #
exit #
`,
        parameters: [],
      },
      {
        mandatory: false,
        name: 'smb.conf',
        folder: 'en_etc.samba',
        content: `[global]
	server role = standalone server
	map to guest = Bad User
	obey pam restrictions = Yes
	pam password change = Yes
	passwd program = /usr/bin/passwd %u
	passwd chat = *Enter\snew\s*\spassword:* %n\n *Retype\snew\s*\spassword:* %n\n *password\supdated\ssuccessfully* .
	unix password sync = Yes
	syslog = 0
	log file = /var/log/samba/log.%m
	max log size = 1000
	dns proxy = No
	usershare allow guests = Yes
	panic action = /usr/share/samba/panic-action %d
	idmap config * : backend = tdb
	security = user

[homes]
	comment = Home Directories
	valid users = %S
	create mask = 0700
	directory mask = 0700
	browseable = No

[printers]
	comment = All Printers
	path = /var/spool/samba
	create mask = 0700
	printable = Yes
	print ok = Yes
	browseable = No

[print$]
	comment = Printer Drivers
	path = /var/lib/samba/printers

[publicaciones]
	comment = Carpeta de publicaciones
	path = /home/documentos/publicaciones
	valid users = tecnico
	read list = @users

[proyectos]
	comment = Carpeta de proyectos
	path = /home/documentos/proyectos
	read only = yes
	writelist = ingeniero
`,
        parameters: [],
      },
      {
        mandatory: false,
        name: 'ssh_config',
        folder: 'en_etc.ssh',
        content: `
# This is the ssh client system-wide configuration file.  See
# ssh_config(5) for more information.  This file provides defaults for
# users, and the values can be changed in per-user configuration files
# or on the command line.

# Configuration data is parsed as follows:
#  1. command line options
#  2. user-specific file
#  3. system-wide file
# Any configuration value is only changed the first time it is set.
# Thus, host-specific definitions should be at the beginning of the
# configuration file, and defaults at the end.

# Site-wide defaults for some commonly used options.  For a comprehensive
# list of available options, their meanings and defaults, please see the
# ssh_config(5) man page.

Host *
#   ForwardAgent no
#   ForwardX11 no
#   ForwardX11Trusted yes
#   RhostsRSAAuthentication no
#   RSAAuthentication yes
#   PasswordAuthentication yes
#   HostbasedAuthentication no
#   GSSAPIAuthentication no
#   GSSAPIDelegateCredentials no
#   GSSAPIKeyExchange no
#   GSSAPITrustDNS no
#   BatchMode no
#   CheckHostIP yes
#   AddressFamily any
#   ConnectTimeout 0
#   StrictHostKeyChecking ask
#   IdentityFile ~/.ssh/identity
#   IdentityFile ~/.ssh/id_rsa
#   IdentityFile ~/.ssh/id_dsa
#   Port 22
#   Protocol 2,1
#   Cipher 3des
#   Ciphers aes128-ctr,aes192-ctr,aes256-ctr,arcfour256,arcfour128,aes128-cbc,3des-cbc
#   MACs hmac-md5,hmac-sha1,umac-64@openssh.com,hmac-ripemd160
#   EscapeChar ~
#   Tunnel no
#   TunnelDevice any:any
#   PermitLocalCommand no
#   VisualHostKey no
#   ProxyCommand ssh -q -W %h:%p gateway.example.com
#   RekeyLimit 1G 1h
    SendEnv LANG LC_*
    HashKnownHosts yes
    GSSAPIAuthentication yes
    GSSAPIDelegateCredentials no

AllowUsers root
`,
        parameters: [],
      },
    ],
  },
  {
    name: 'dhcp',
    displayName: 'DHCP',
    files: [
      {
        mandatory: true,
        name: 'confautdhcp.sh',
        content: `#!/bin/bash
# -*- ENCODING: UTF-8 -*-
cp -i en_etc.default/* /etc/default/ #
# cp -i en_etc.dhcp/* /etc/dhcp/ #
service isc-dhcp-server restart #
exit #
`,
        parameters: [],
      },
      {
        mandatory: false,
        name: 'isc-dhcp-server',
        folder: 'en_etc.default',
        content: `# Defaults for isc-dhcp-server initscript
# sourced by /etc/init.d/isc-dhcp-server
# installed at /etc/default/isc-dhcp-server by the maintainer scripts

#
# This is a POSIX shell fragment
#

# Path to dhcpd's config file (default: /etc/dhcp/dhcpd.conf).
#DHCPD_CONF=/etc/dhcp/dhcpd.conf

# Path to dhcpd's PID file (default: /var/run/dhcpd.pid).
#DHCPD_PID=/var/run/dhcpd.pid

# Additional options to start dhcpd with.
#	Don't use options -cf or -pf here; use DHCPD_CONF/ DHCPD_PID instead
#OPTIONS=""

# On what interfaces should the DHCP server (dhcpd) serve DHCP requests?
#	Separate multiple interfaces with spaces, e.g. "eth0 eth1".
INTERFACES=""
`,
        parameters: [],
      },
      {
        mandatory: false,
        name: 'dhcpd.conf',
        folder: 'en_etc.dhcp',
        content: `#
# Sample configuration file for ISC dhcpd for Debian
#
#

# The ddns-updates-style parameter controls whether or not the server will
# attempt to do a DNS update when a lease is confirmed. We default to the
# behavior of the version 2 packages ('none', since DHCP v2 didn't
# have support for DDNS.)
ddns-update-style none;

# option definitions common to all supported networks...
option domain-name "example.org";
option domain-name-servers ns1.example.org, ns2.example.org;

default-lease-time 600;
max-lease-time 7200;

# If this DHCP server is the official DHCP server for the local
# network, the authoritative directive should be uncommented.
#authoritative;

# Use this to send dhcp log messages to a different log file (you also
# have to hack syslog.conf to complete the redirection).
log-facility local7;

# No service will be given on this subnet, but declaring it helps the 
# DHCP server to understand the network topology.

#subnet 10.152.187.0 netmask 255.255.255.0 {
#}

# This is a very basic subnet declaration.

#subnet 10.254.239.0 netmask 255.255.255.224 {
#  range 10.254.239.10 10.254.239.20;
#  option routers rtr-239-0-1.example.org, rtr-239-0-2.example.org;
#}

# This declaration allows BOOTP clients to get dynamic addresses,
# which we don't really recommend.

#subnet 10.254.239.32 netmask 255.255.255.224 {
#  range dynamic-bootp 10.254.239.40 10.254.239.60;
#  option broadcast-address 10.254.239.31;
#  option routers rtr-239-32-1.example.org;
#}

# A slightly different configuration for an internal subnet.
#subnet 10.5.5.0 netmask 255.255.255.224 {
#  range 10.5.5.26 10.5.5.30;
#  option domain-name-servers ns1.internal.example.org;
#  option domain-name "internal.example.org";
#  option routers 10.5.5.1;
#  option broadcast-address 10.5.5.31;
#  default-lease-time 600;
#  max-lease-time 7200;
#}

# Hosts which require special configuration options can be listed in
# host statements.   If no address is specified, the address will be
# allocated dynamically (if possible), but the host-specific information
# will still come from the host declaration.

#host passacaglia {
#  hardware ethernet 0:0:c0:5d:bd:95;
#  filename "vmunix.passacaglia";
#  server-name "toccata.fugue.com";
#}

# Fixed IP addresses can also be specified for hosts.   These addresses
# should not also be listed as being available for dynamic assignment.
# Hosts for which fixed IP addresses have been specified can boot using
# BOOTP or DHCP.   Hosts for which no fixed address is specified can only
# be booted with DHCP, unless there is an address range on the subnet
# to which a BOOTP client is connected which has the dynamic-bootp flag
# set.
#host fantasia {
#  hardware ethernet 08:00:07:26:c0:a5;
#  fixed-address fantasia.fugue.com;
#}

# You can declare a class of clients and then do address allocation
# based on that.   The example below shows a case where all clients
# in a certain class get addresses on the 10.17.224/24 subnet, and all
# other clients get addresses on the 10.0.29/24 subnet.

#class "foo" {
#  match if substring (option vendor-class-identifier, 0, 4) = "SUNW";
#}

#shared-network 224-29 {
#  subnet 10.17.224.0 netmask 255.255.255.0 {
#    option routers rtr-224.example.org;
#  }
#  subnet 10.0.29.0 netmask 255.255.255.0 {
#    option routers rtr-29.example.org;
#  }
#  pool {
#    allow members of "foo";
#    range 10.17.224.10 10.17.224.250;
#  }
#  pool {
#    deny members of "foo";
#    range 10.0.29.10 10.0.29.230;
#  }
#}
`,
        parameters: [],
      },
    ],
  },
  {
    name: 'http',
    displayName: 'HTTP',
    files: [
      {
        mandatory: true,
        name: 'confauthttp.sh',
        content: `#!/bin/bash
# -*- ENCODING: UTF-8 -*-
#Estructura de directorios para sitio web
mkdir -p /var/www/html/public/novedades.robot.zone.cu #
mkdir -p /var/www/html/public/ciencia.robot.zone.cu #
chmod -R 755 /var/www/html #
#Copiar ficheros de configuracion
cp -f en_etc.apache2.sites-available/* /etc/apache2/sites-available/ #
#Copiar pagina de prueba para directorios creados
cp -f -r en_var.www.html/* /var/www/html/ #
a2dissite default #
a2ensite novedades.robot.zone.cu #
a2ensite ciencia.robot.zone.cu #
service apache2 restart #
exit #
`,
        parameters: [],
      },
    ],
  },
];
