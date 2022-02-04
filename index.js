import "./assets/pspdfkit.js";

const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

const searchQuery = "Company Ltd.";

(async () => {
  const res = await fetch("/data.json");
  const data = await res.json();

  // load the PDF in headless mode
  const instance = await PSPDFKit.load({
    baseUrl,
    headless: true,
    document: "/document.pdf",
    licenseKey: "YOUR_LICENSE_KEY", // OPTIONAL License Key - If you have a license key, you can use it here. If not, please remove this line.
  });

  // Create a free text annotation.
  const textAnnotation = new PSPDFKit.Annotations.TextAnnotation({
    // COMPANY bounding box
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
    // [Company Info] bounding box
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

  // Company Ltd. bounding box
  const bbox = (await instance.search(searchQuery)).first().rectsOnPage.get(0);

  const textAnnotation3 = new PSPDFKit.Annotations.TextAnnotation({
    boundingBox: bbox,
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

  // load the PDF with the UI
  await PSPDFKit.load({
    baseUrl,
    document: flattenedDocument,
    container: "#pspdfkit",
    licenseKey: "YOUR_LICENSE_KEY", // OPTIONAL License Key - If you have a license key, you can use it here. If not, please remove this line.
  });
})();

// Find all the words in PDF
// (await instance.textLinesForPageIndex(0)).toJS()
