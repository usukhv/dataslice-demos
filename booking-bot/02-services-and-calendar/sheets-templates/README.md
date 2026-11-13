# Booking Bot хүснэгтийн загвар

- `Services.csv`: үйлчилгээ, үргэлжлэх хугацаа (минут), үнэ, тайлбар. 5 жишээ мөртэй.
- `Bookings.csv`: захиалгын бүртгэлийн гарчиг ба 3 жишээ мөр. Бот энд өөрөө бичнэ.

1. Google Sheets-д `Booking Bot` нэртэй хоосон файл нээ.
2. **File > Import > Upload** дээр `Services.csv`-г сонго. **Import location** нь **Insert new sheet(s)**.
3. `Bookings.csv`-г мөн адил import хий. Хуудасны нэр `Services`, `Bookings` байгаа эсэхийг шалга.
4. Services-ийн жишээ мөрийг өөрийн үйлчилгээ, бодит үнээр соль. Bookings-ийн 3 жишээ мөрийг устга, гарчгийг үлдээ.
5. Баганын нэрийг бүү өөрчил. n8n workflow яг эдгээр нэрээр уншина.
