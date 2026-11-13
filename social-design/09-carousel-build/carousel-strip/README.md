# carousel-strip

9-р хичээлийн 5 слайдтай carousel, нэг урт SVG (5400 × 1350).

- `carousel-5400x1350.svg`: `slide-01`...`slide-05` group-ууд, хил дамнасан `cross-circle`, `cross-photo`, `cross-line`, слайдын хил ба 80 px margin-ийг харуулах `slide-guides`.
- `slices.txt`: 5 Slice-ийн X байрлал.

1. SVG-г **Дасгал** хуудас руу чирж оруул. 5400 × 1350 Frame болно.
2. `slide-guides` group-ийг нуу эсвэл устгаад оронд нь **Layout guide** тавь.
3. `cross-photo`-ийн **Fill**-д өөрийн зургийг чирж тавь, текстийг өөрийн сэдвээр соль.
4. `slices.txt`-ийн дагуу 5 **Slice** зураад PNG 1x-ээр экспортло.
