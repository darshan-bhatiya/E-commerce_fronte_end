import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: []
})
export class GalleryComponent implements OnInit {

  selectedImageURL!: string;

  @Input() images!: string[] | undefined;

  ngOnInit(): void {
    if (this.images?.length) {
      this.selectedImageURL = this.images[0];
    }
  }

  changeSelectedImage(imageURL: string) {
    this.selectedImageURL = imageURL;
  }

  get hasImages() {
    return this.images?.length;
  }
}
