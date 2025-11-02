
export type GalleryItem = {
  id: string;
  title: string;
  imageId: string;
};

// This is the "special place" where you can manage your gallery images.
// Just add new items to this array, making sure the `imageId` matches
// an `id` in the `src/lib/placeholder-images.json` file.
export const galleryImages: GalleryItem[] = [
  {
    "id": "gallery-1",
    "title": "Structural Steel Frame",
    "imageId": "gallery-img-1"
  },
  {
    "id": "gallery-2",
    "title": "Custom Gate Fabrication",
    "imageId": "gallery-img-2"
  },
  {
    "id": "gallery-4",
    "title": "Architectural Metalwork",
    "imageId": "gallery-img-4"
  },
  {
    "id": "gallery-5",
    "title": "On-Site Installation",
    "imageId": "gallery-img-5"
  },
  {
    "id": "gallery-6",
    "title": "Finished Steel Structure",
    "imageId": "gallery-img-6"
  },
  {
    "id": "gallery-8",
    "title": "completed projects",
    "imageId": "gallery-img-8"
  }
];
