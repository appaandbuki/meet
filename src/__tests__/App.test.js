import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";

//below is unit testing
describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("render NumberOfEvents", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

//new scope for integration testing
describe("<App /> integration", () => {
  test('App passes "events" state as a prop to EventList', () => {
    //wrapper
    const AppWrapper = mount(<App />);
    //checks that the state of events isnt undefined
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    //compares the state of App's events with EventList's events prop to ensure its been passeed correcttly
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    //you need to “clean up” your DOM after each test using a function called unmount().
    AppWrapper.unmount();
  });

  //locations prop of CitySearch needs to be passed from the App component
  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  test("get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    //CitySearch's "suggestions" state is set to have all available cities
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    //variable selectedIndex will hold the index of the selected suggestion from the "suggestions" array
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    //selected index is used to return the actual suggestion (stored in selectedCity)
    const selectedCity = suggestions[selectedIndex];
    //calls the handleItemClicked() method from CitySearch
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    //getEvents() gets all the events from the API asynchronously (or from mock data in tests)
    const allEvents = await getEvents();
    //list of all events is filtered against the selected location/city to find the events with the same location (stored in eventsToShow)
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    //compares whether the state of 'events' = eventsToShow
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    // simulates a click on the last list item (which will always be “See all cities”)
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    // checks if the events state of the App component equals the list of all events.

    expect(AppWrapper.state("events")).toEqual(allEvents);
    AppWrapper.unmount();
  });
});
