import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Auth } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-update-img',
  templateUrl: './update-img.component.html',
  styleUrls: ['./update-img.component.css'],
})
export class UpdateImgComponent implements OnInit {
  public imge: File;
  Id;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  public size;

  constructor(
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
  }
  fileSlecet(event) {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const fileBeforCrop = this.imageChangedEvent.target.files[0];
    this.size = fileBeforCrop.size;
    this.imge = new File([event.file], fileBeforCrop.name, {
      type: fileBeforCrop.type,
    });
  }
  fileUpload() {
    const fd = new FormData();
    fd.append('avatar', this.imge, this.imge.name);
    this.auth.UpdateUserAvatar(fd).subscribe(
      (res: any) => {
        this.router.navigate(['/my-profile']);
      },
      () => {}
    );
  }
}
