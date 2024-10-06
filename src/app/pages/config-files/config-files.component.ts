import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FilesService } from '../../services/files.service';
import { FileInfo } from '../../interfaces/file.interface';
import Swal from 'sweetalert2';
import { downloadFile } from '../../helpers/download_file';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-config-files',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './config-files.component.html',
  styleUrl: './config-files.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFilesComponent implements OnInit{

  private fileService = inject(FilesService);
  private cdrf = inject(ChangeDetectorRef);

  public dataFiles: FileInfo[] = [];
  public dataFilesAux: FileInfo[] = [];
  public currentFile = signal({} as FileInfo);

  ngOnInit(): void {
    this.fileService.getAllConfigFiless().subscribe(
      data => {
        this.dataFiles = data
        this.dataFilesAux = data
        this.currentFile.set(data[0]);
        this.cdrf.detectChanges();
      }
    );
  }

  manageFile(file: FileInfo) {
    this.currentFile.set(file);
  }

  saveFile() {

    const content = document.querySelector('textarea')!.value;
    if (content === 'No hay contenido' || content === '') {
      Swal.fire(
        'Error',
        'El contenido del archivo no puede estar vacío',
        'error'
      )
      return;
    }

    const full_path = this.currentFile().full_path + '/' + this.currentFile().file_name!;
    this.fileService.saveFile(full_path, content!).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  async download() {
    await downloadFile('files', '')
  }

  onSearch(){
    const search = document.getElementById('search') as HTMLInputElement;
    const value = search!.value;
    if (value === ''){
      this.dataFiles = this.dataFilesAux;
      return;
    }
    this.dataFiles = this.dataFiles.filter(file => {
      return file.file_name!.toLowerCase().includes(value.toLowerCase());
    });
  }

}
