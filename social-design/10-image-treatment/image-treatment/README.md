# image-treatment

10-р хичээлийн 2 загвар, тус бүр 1080 × 1350.

- `arch-mask.svg`: `mask-shape` нь нуман хаалга хэлбэр. Зургаа түүний дээр тавиад хоёуланг сонгож **Use as mask** (Mac: Ctrl + Cmd + M, Windows: Ctrl + Alt + M).
- `gradient-overlay.svg`: `photo` дээр `overlay` gradient (хар 0%-иас 70% хүртэл), доор нь цагаан гарчиг.

Нээх: файлуудыг Figma руу чирж оруул.
Солих: `photo`, `mask-shape`-ийн **Fill**-д өөрийн зургийг чирж тавь, `hint`, `photo-label`-ийг устга.
Gradient-ийн хүчийг `overlay`-ийн **Fill** дээр дарж тааруул. Дараа нь цагаан текстийн контрастыг шалга.
Duotone-ыг Figma дотор blend mode-оор хийнэ (хичээлийн 4-5-р алхам).
