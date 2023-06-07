import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function generateTripTicket(selectedRequest) {
  const { vehicle_name, driver_name, departure_time, arrival_time, destination, passenger_count, passenger_names, purpose, requested_by } = selectedRequest;

  try {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12 * 1;
    const boldTimesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold); // Added

    //title
    const textLine1 = 'DEPARTMENT OF SCIENCE AND TECHNOLOGY';
    const textLine2 = 'Regional Office No. 1';
    const textLine3 = 'DMMMSU - MLUC Campus, San Fernando City';

    const textLine4 = `  ${departure_time}`;
    const textLine5 = `Departure Date & Time`;

    const textLine6 = `DRIVER'S TRIP TICKET`;

    const textLine7 = `A. To be filled by the Administrative Officer authorizing Official Travel:`;
    const textLine8 = `1. Name of the Driver of the Vehicle: ${driver_name}`;
    const textLine9 = `2. Government Car to be used, Plate No.: ${vehicle_name}`;
    const textLine10 = `3. Name of Authorized Passenger/s: ${passenger_names}`;
    const textLine11 = `4. Places to be visited/inspected: ${destination}`;
    const textLine12 = `5. Purpose/s: ${purpose}`;

    const textLine13 = `B. To be filled by Driver:`
    const textLine14 = `1. Time of Departure from the office garage:        _________________________________________`
    const textLine15 = `2. Time of arrival at (for No.4 above):                   _________________________________________`
    const textLine16 = `3. Time of departure from (for No.4 above):         _________________________________________`
    const textLine17 = `4. Time of arrival back to office/garage:               _________________________________________`
    const textLine18 = `5. Approximate distance travelled:                        _________________________________________`
    const textLine19 = `6. Gasoline issued, purchased and consumed:       _________________________________________`

    const textLine20 = `a. Balance in the tank                                    :__________________________liters`
    const textLine21 = `b. Issued by the office from stock                 :__________________________liters`
    const textLine22 = `c. Add purchased during trip                         :__________________________liters`
    const textLine23 = `TOTAL                                                          :__________________________liters`
    const textLine24 = `d. Deducted during the trip                            :__________________________liters`
    const textLine25 = `e. Balance in the tank at the end of the trip:  :__________________________liters`

    const textLine26 = `7. Motor oil issued                                                  _________________________________________`
    const textLine27 = `8. Lubricating oil issued                                         _________________________________________`
    const textLine28 = `9. Brake Fluid issued                                              _________________________________________`
    const textLine29 = `10. Speedometer reading:                                       _________________________________________`
    const textLine30 = `At the beginning of the trip                            _________________________________________`
    const textLine31 = `At the end of the trip                                      _________________________________________`
    const textLine32 = `Distance traveled                                            _________________________________________`
    const textLine33 = `11. REMARKS: __________________________________________________________________`
    const textLine34 = `I hereby certify to the correctness of the above statements of record of travel.`

    const textLine35 = `_________________`
    const textLine36 = `             Driver`

    const textLine37 = `I hereby certify that I used this Car on official business as stated above.`

    const textLine38 = `______________________              ______________________              ______________________`
    const textLine39 = `              Passenger                                           Passenger                                           Passenger`

    // Get the width of the text
    const textLine1Width = timesRomanFont.widthOfTextAtSize(textLine1, fontSize);
    const textLine2Width = timesRomanFont.widthOfTextAtSize(textLine2, fontSize);
    const textLine3Width = timesRomanFont.widthOfTextAtSize(textLine3, fontSize);
    const textLine6Width = timesRomanFont.widthOfTextAtSize(textLine6, fontSize);
    const textLine7Width = timesRomanFont.widthOfTextAtSize(textLine7, fontSize);


    // Calculate the x-coordinate to center the text
    const centerXLine1 = (width - textLine1Width) / 2;
    const centerXLine2 = (width - textLine2Width) / 2;
    const centerXLine3 = (width - textLine3Width) / 2;
    const centerXLine4 = (width + textLine3Width) / 1.9;
    const centerXLine5 = (width + textLine3Width) / 1.9;
    const centerXLine6 = (width - textLine6Width) / 2;
    const centerXLine7 = (width - textLine7Width) / 5;
    const centerXLine8 = (width) / 8;
    const centerXLine9 = (width) / 8;
    const centerXLine10 = (width) / 8;
    const centerXLine11 = (width) / 8;
    const centerXLine12 = (width) / 8;

    const centerXLine13 = (width - textLine7Width) / 5;
    const centerXLine14 = (width - textLine7Width) / 5;
    const centerXLine15 = (width - textLine7Width) / 5;
    const centerXLine16 = (width - textLine7Width) / 5;
    const centerXLine17 = (width - textLine7Width) / 5;
    const centerXLine18 = (width - textLine7Width) / 5;
    const centerXLine19 = (width - textLine7Width) / 5;

    const centerXLine20 = (width) / 8;
    const centerXLine21 = (width) / 8;
    const centerXLine22 = (width) / 8;
    const centerXLine23 = (width) / 8;
    const centerXLine24 = (width) / 8;
    const centerXLine25 = (width) / 8;

    const centerXLine26 = (width - textLine7Width) / 5;
    const centerXLine27 = (width - textLine1Width) / 2 - 18;


    page.drawText(textLine1, {
      x: centerXLine1,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0), 
    });

    page.drawText(textLine2, {
      x: centerXLine2,
      y: height - 5 * fontSize, 
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(textLine3, {
      x: centerXLine3,
      y: height - 6 * fontSize, 
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0), 
    });

    page.drawText(textLine4, {
        x: centerXLine4,
        y: height - 9 * fontSize, 
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0), 
    });

    page.drawText(textLine5, {
        x: centerXLine5,
        y: height - 10.5 * fontSize, 
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0), 
    });

    page.drawText(textLine6, {
        x: centerXLine6,
        y: height - 13   * fontSize, 
        size: fontSize,
        font: boldTimesRomanFont,
        color: rgb(0, 0, 0), 
    });

    page.drawText(textLine7, {
        x: centerXLine7,
        y: height - 15   * fontSize, 
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0), 
    });

    page.drawText(textLine8, {
        x: centerXLine8,
        y: height - 16   * fontSize, 
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0), 
    });

    page.drawText(textLine9, {
        x: centerXLine9,
        y: height - 17   * fontSize, 
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0), 
    });

    page.drawText(textLine10, {
        x: centerXLine10,
        y: height - 18   * fontSize, 
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0), 
    });

    page.drawText(textLine11, {
        x: centerXLine11,
        y: height - 19   * fontSize, 
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0), 
    });

    page.drawText(textLine12, {
        x: centerXLine12,
        y: height - 20   * fontSize, 
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0), 
    });

    page.drawText(textLine13, {
      x: centerXLine13,
      y: height - 22   * fontSize, 
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0), 
  });

    page.drawText(textLine14, {
      x: centerXLine14,
      y: height - 23   * fontSize, 
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0), 
  });

  page.drawText(textLine15, {
    x: centerXLine15,
    y: height - 24   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine16, {
    x: centerXLine16,
    y: height - 25   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine17, {
    x: centerXLine17,
    y: height - 26   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine18, {
    x: centerXLine18,
    y: height - 27   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine19, {
    x: centerXLine19,
    y: height - 28   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine20, {
    x: centerXLine20,
    y: height - 29   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine21, {
    x: centerXLine21,
    y: height - 30   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine22, {
    x: centerXLine22,
    y: height - 31   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine23, {
    x: centerXLine23,
    y: height - 32   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine24, {
    x: centerXLine24,
    y: height - 33   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine25, {
    x: centerXLine25,
    y: height - 34   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine26, {
    x: centerXLine26,
    y: height - 35   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine27, {
    x: centerXLine26,
    y: height - 36   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine28, {
    x: centerXLine26,
    y: height - 37   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine29, {
    x: centerXLine26,
    y: height - 38   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine30, {
    x: centerXLine25,
    y: height - 39   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine31, {
    x: centerXLine25,
    y: height - 40   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine32, {
    x: centerXLine25,
    y: height - 41   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine33, {
    x: centerXLine26,
    y: height - 42   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine34, {
    x: centerXLine27,
    y: height - 43   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine35, {
    x: centerXLine4,
    y: height - 46   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine36, {
    x: centerXLine4,
    y: height - 47   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine37, {
    x: centerXLine1 - 35,
    y: height - 50   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine38, {
    x: centerXLine1 - 100,
    y: height - 54   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

  page.drawText(textLine39, {
    x: centerXLine1 - 100,
    y: height - 55   * fontSize, 
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0), 
  });

    const departureTimeWidth = timesRomanFont.widthOfTextAtSize(departure_time, fontSize);
    const departureTimeX = centerXLine4;
    const departureTimeY = height - 9 * fontSize - fontSize / 2;
    const underlineWidth = departureTimeWidth + 14;
    const underlineHeight = 1;
    page.drawRectangle({
      x: departureTimeX,
      y: departureTimeY,
      width: underlineWidth,
      height: underlineHeight,
      color: rgb(0, 0, 0),
      borderColor: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    // Create a Blob from the PDF bytes
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Create a link element and simulate a click to download the PDF
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${driver_name}.trip_ticket.pdf`;
    link.click();
  } catch (error) {
    console.log('Error generating PDF:', error);
  }
}
