# Баримтын хүснэгт ба туршилтын workflow

- `receipts-template.csv`: 11 баганатай хүснэгтийн загвар, 4 жишээ мөртэй.
- `sheets-test-workflow.json`: Manual Trigger, Edit Fields, Google Sheets **Append Row** гэсэн 3 node-той туршилтын workflow.

Ашиглах:

1. Google Sheets-д шинэ хүснэгт нээж **File** > **Import** цэсээр `receipts-template.csv`-ийг оруул. **Replace current sheet** сонгоод **Convert text to numbers, dates, and formulas**-ийг унтраа. Табын нэрийг `receipts` болго.
2. n8n-д **...** > **Import** > **From file** дарж `sheets-test-workflow.json`-ийг сонго.
3. `Append row in sheet` node-ийг нээж Google Sheets credential-ээ сонго. **Document** талбарт өөрийн хүснэгтийн холбоосыг тавь (`YOUR_SHEET_ID`-ийг солино).
4. Жишээ мөрүүд сарын тайлан турших үед хэрэгтэй. Жинхэнэ ашиглалтын өмнө устга.
