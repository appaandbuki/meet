//do not need to import components or Enzyme
//you DO need to to deploy your app using "npm run start" before running tests
import puppeteer from "puppeteer";

//define a new scope using describe ()
describe("show/hide an event details", () => {
  let browser;
  let page;
  //BEFORE EVERY TEST =>
  beforeAll(async () => {
    jest.setTimeout(30000);

    //start by launching browser using puppeteer
    browser = await puppeteer.launch({
      headless: false, // turns ON the UI (so you can watch it in browser)
      slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
    });
    //creates a new page
    page = await browser.newPage();

    //navigates to you locally hosted app
    await page.goto("http://localhost:3000/");
    //waitForSelector() waits until a desired element appears
    //here, we wait until Event list is loaded before moving on
    await page.waitForSelector(".event");
  });

  //AFTER EVERY TEST=>
  afterAll(() => {
    //closes the browser
    browser.close();
  });
  //Feature 2 Scenario 1
  test("An event element is collapsed by default", async () => {
    //Puppeteer provides page.$() for selecting an element on the page
    //here, we select the event details. If this is present, then it means the event is expanded
    const eventDetails = await page.$(".event .event__Details");
    //Jest expect() checks if this element (eventDetails) is present
    expect(eventDetails).toBeNull();
  });

  //Feature 2 Scenario 2 : when the user clicks the details button, they should be shown extra details about the event
  test("User can expand an event to see its details", async () => {
    //waiting for the event component to render
    await page.waitForSelector(".event");
    //simulates the user clicking on the "details" button
    await page.click(".event .details-btn");
    //checks for the .extra element
    const eventDetails = await page.$(".event .event__Details");
    //expect() uses toBeDefined () matcher instead to toBeNull() bc you want it to exist
    expect(eventDetails).toBeDefined();
  });

  ///Feature 2 Scenario 3: User can collapse an event to hide its details.
  test("User can collapse an event to hide its details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .event__Details");
    //ensures that the extra details no longer exist
    expect(eventDetails).toBeNull();
  });
});
