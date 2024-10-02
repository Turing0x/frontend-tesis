export async function downloadFile(path: string, obj_id: string) {
  const response = await fetch(`http://localhost:8080/api/${path}/download/${obj_id}`);
  if( !response.ok ) { return }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `prueba.rar`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}