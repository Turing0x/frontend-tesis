import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule
  ],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardComponent implements OnInit {

  private readonly INVARIABLE_CONTENT = {
    'confautbasica.sh': `#!/bin/bash
# -*- ENCODING: UTF-8 -*-
cp -i hostname /etc/ #
cp -i hosts /etc/ #
cp -i resolv.conf /etc/ #
cp -i interfaces /etc/network/ #
/etc/init.d/networking restart #
ifconfig #
reboot #
exit #`,
    'resolv.conf': `domain robot.zone.cu
search robot.zone.cu
nameserver 127.0.0.1`,
  };

  constructor(private formBuilder: FormBuilder) {}

  serviceFormGroup = new FormGroup({
    bind: new FormControl(false),
    share: new FormControl(false),
    basicConfig: new FormControl(false),
    dhcp: new FormControl(false),
    http: new FormControl(false),
  });

  fileFormGroup = new FormGroup({});
  parameterFormGroup!: FormGroup;

  get selectedServices(): string[] {
    return Object.entries(this.serviceFormGroup.value)
      .filter(([_, selected]) => selected)
      .map(([service]) => service);
  }

  get selectedFiles(): string[] {
    return Object.keys(this.parameterFormGroup.controls);
  }

  getServiceFiles(service: string): string[] {
    // Map services to their associated files
    const serviceFiles: Record<string, string[]> = {
      bind: ['named.conf', 'zones/forward.zone', 'zones/reverse.zone'],
      share: ['smb.conf', 'exports'],
      basicConfig: ['hostname.conf', 'hosts'],
      dhcp: ['dhcpd.conf'],
      http: ['apache2.conf', 'sites-available/default'],
    };
    return serviceFiles[service] || [];
  }

  getFileType(file: string): string {
    // Map files to their parameter types
    const fileTypes: Record<string, string> = {
      'hostname.conf': 'hostname',
      hosts: 'hostname',
      'named.conf': 'domain',
      'dhcpd.conf': 'network',
      // Add more file type mappings as needed
    };
    return fileTypes[file] || 'text';
  }

  ngOnInit() {
    // Initialize fileFormGroup based on service selection
    this.serviceFormGroup.valueChanges.subscribe((services) => {
      const newFileGroup: Record<string, FormControl> = {};

      Object.entries(services).forEach(([service, selected]) => {
        if (selected) {
          newFileGroup[`${service}Files`] = new FormControl([]);
        }
      });

      this.fileFormGroup = new FormGroup(newFileGroup);
    });

    // Initialize parameterFormGroup based on file selection
    this.fileFormGroup.valueChanges.subscribe((files) => {
      const newParamGroup: Record<string, FormControl> = {};

      Object.values(files)
        .flat()
        .forEach((file) => {
          if (file) {
            newParamGroup[`${file}Param`] = new FormControl(
              '',
              Validators.required
            );
          }
        });

      this.parameterFormGroup = new FormGroup(newParamGroup);
    });

    this.parameterFormGroup = this.formBuilder.group({
      hostname: ['', Validators.required],
      address: ['', [Validators.required, Validators.pattern(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)]],
      netmask: ['', [Validators.required, Validators.pattern(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)]],
      network: ['', [Validators.required, Validators.pattern(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)]]
    });

    this.serviceFormGroup = this.formBuilder.group({
      basicConfig: [false],
      bind: [false],
      share: [false],
      dhcp: [false],
      http: [false]
    });
  }

  getInvariableContent(filename: keyof typeof this.INVARIABLE_CONTENT): string {
    return this.INVARIABLE_CONTENT[filename] || '';
  }

  generateFiles() {
    const hostname = this.parameterFormGroup.get('hostname')?.value || 'prrueba';

    // Generate hostname.txt
    const hostnameContent = hostname;

    // Generate hosts.txt
    const hostsContent = `127.0.0.1 localhost
127.0.1.1 ${hostname}.robot.zone.cu ${hostname}

# The following lines are desirable for IPv6 capable hosts
::1 localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters`;

    // Generate interfaces.txt
    const interfacesContent = `# This file describes the network interfaces available on your system
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
address ${this.parameterFormGroup.get('address')?.value ?? 'address'}
netmask ${this.parameterFormGroup.get('netmask')?.value ?? 'netmask'}
network ${this.parameterFormGroup.get('network')?.value ?? 'network'}`;

    // Here you would implement the actual file generation logic
    // This could involve calling a backend API or using the File API
    this.saveFiles({
      'hostname': hostnameContent,
      'hosts': hostsContent,
      'interfaces': interfacesContent,
      'confautbasica.sh': this.INVARIABLE_CONTENT['confautbasica.sh'],
      'resolv.conf': this.INVARIABLE_CONTENT['resolv.conf'],
    });
  }

  private saveFiles(files: { [key: string]: string }) {
    console.log('Files to generate:', files);
  }

  public someServiceSelectes(): boolean {
    return Object.values(this.serviceFormGroup.controls)
      .some(control => (control as FormControl<boolean | null>).value);
  }

  public someFileSelected(): boolean {
    return Object.values(this.fileFormGroup.controls)
      .some(control => (control as FormControl<boolean | null>).value);
  }

}
