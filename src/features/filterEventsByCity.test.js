import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount, shallow } from "enzyme";
import App from "../App";
import { mockData } from "../mock-data";
import CitySearch from "../CitySearch";
import { locations } from "../api";

const feature = loadFeature("./src/features/filterEventsByCity.feature");
//Feature 1: Scenario 1
defineFeature(feature, (test) => {
  test("When user hasn’t searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn’t searched for any city", () => {});

    let AppWrapper;
    //when step is where you need to specify the main action
    //here, the App compontent is rendered using mount
    //rendering the app component is equivalent to "the app has just opened"
    when("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });
    //App.Wrapper.update is needed since getting the list of events is an asynchronous action
    then("the user should see the list of upcoming events.", () => {
      AppWrapper.update();
      //the list of evenst rendered is the App component is compared with the list of events from the mock API
      expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
    });
  });

  //Feature 1: Scenario 2
  test("User should see a list of suggestions when they search for a city", ({
    given,
    when,
    then,
  }) => {
    let CitySearchWrapper;
    //use shallow (not mount) bc we dont need to render any of CitySearch's children
    given("the main page is open", () => {
      CitySearchWrapper = shallow(
        <CitySearch updateEvents={() => {}} locations={locations} />
      );
    });
    //simulate() is used to simulate the 'change' event on the city element- giving it the value of "Berlin"
    when("the user starts typing in the city textbox", () => {
      CitySearchWrapper.find(".city").simulate("change", {
        target: { value: "Berlin" },
      });
    });
    //when the user types in "berlin" there should be 2 suggestions (berlin and sell all cities)
    then(
      "the user should receive a list of cities (suggestions) that match what they’ve typed",
      () => {
        expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(2);
      }
    );
  });

  //Feature 1: Scenario 3
  test("User can select a city from the suggested list", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    //given is async to allow the App component to load the events and locations
    given("user was typing “Berlin” in the city textbox", async () => {
      //rendered using mount (since the app does need to be open first + interacts with child (SeachSearch))
      AppWrapper = await mount(<App />);
      //simulate is used to simulate a 'change' event on the city element, changing its value to vberlin
      AppWrapper.find(".city").simulate("change", {
        target: { value: "Berlin" },
      });
    });

    and("the list of suggested cities is showing", () => {
      //update on Appwrapper to ensure the App comp. is updated after it recives the list of suggestions
      AppWrapper.update();
      //expect () checks whether two suggestions are being displayed in App's list of suggestions
      expect(AppWrapper.find(".suggestions li")).toHaveLength(2);
    });

    when(
      "the user selects a city (e.g., “Berlin, Germany”) from the list",
      () => {
        //simulates a 'click' event on the first suggestion (here that is Berlin,Germany)
        AppWrapper.find(".suggestions li").at(0).simulate("click");
      }
    );

    then(
      "their city should be changed to that city (i.e., “Berlin, Germany”)",
      () => {
        //we can access CitySearch because we mounted App component in 'given'
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        //usings a toBe() matcher to check whether the state of 'query' = "Berlin,Germany"
        expect(CitySearchWrapper.state("query")).toBe("Berlin, Germany");
      }
    );

    and(
      "the user should receive a list of upcoming events in that city",
      () => {
        //expect() checks if the # of events rendered in App = the # of Mock Events in "mock-events.js"
        expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
      }
    );
  });
});
