import "./assets/pspdfkit.js";

const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

(async () => {
  const res = await fetch("/data.json");
  const data = await res.json();

  const instance = await PSPDFKit.load({
    baseUrl,
    headless: true,
    document: "/document.pdf",
    licenseKey: "YOUR_LICENSE_KEY", // OPTINAL License Key - If you have a license key, you can use it here. If not, please remove this line.
  });

  // Create a free text annotation.
  const textAnnotation = new PSPDFKit.Annotations.TextAnnotation({
    boundingBox: new PSPDFKit.Geometry.Rect({
      height: 9.0675048828125,
      left: 60.375,
      top: 37.739990234375,
      width: 46.905006408691406,
    }),
    fontSize: 8,
    text: data.company,
    pageIndex: 0,
    fontColor: PSPDFKit.Color.RED,
    backgroundColor: PSPDFKit.Color.WHITE,
  });

  const textAnnotation2 = new PSPDFKit.Annotations.TextAnnotation({
    boundingBox: new PSPDFKit.Geometry.Rect({
      height: 9.0675048828125,
      left: 478.6350402832031,
      top: 37.739990234375,
      width: 82.69503784179688,
    }),
    fontSize: 8,
    text: data.companyInfo,
    pageIndex: 0,
    fontColor: PSPDFKit.Color.RED,
    backgroundColor: PSPDFKit.Color.WHITE,
  });

  const textAnnotation3 = new PSPDFKit.Annotations.TextAnnotation({
    boundingBox: new PSPDFKit.Geometry.Rect({
      height: 10.8809814453125,
      left: 60.540000915527344,
      top: 188.53802490234375,
      width: 57.52800750732422,
    }),
    fontSize: 8,
    text: data.companyName,
    pageIndex: 0,
    fontColor: PSPDFKit.Color.RED,
    backgroundColor: PSPDFKit.Color.WHITE,
  });

  // Add the annotations to the document.
  await instance.create([textAnnotation, textAnnotation2, textAnnotation3]);

  const flattenedDocument = await instance.exportPDF({ flatten: true });
  // console.log(await instance.exportInstantJSON());

  await PSPDFKit.load({
    baseUrl,
    document: flattenedDocument,
    container: "#pspdfkit",
    licenseKey: "YOUR_LICENSE_KEY", // OPTINAL License Key - If you have a license key, you can use it here. If not, please remove this line.
  });
})();

// Find all the words in PDF
// (await instance.textLinesForPageIndex(0)).toJS()
