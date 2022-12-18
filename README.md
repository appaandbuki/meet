# Meet App

Meet App allows users to serach for a city and get a list of events hosted in that city.

Meet app is a serverless, progressive web application (PWA) built with React. It This application uses the Google Calendar API to fetch upcoming events.

## Key Features

Key Feature 1: Filter events by city.

    Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
        Given user hasn’t searched for any city
        When the user opens the app
        Then the user should see a list of all upcoming events

    Scenario 2: User should see a list of suggestions when they search for a city.
        Given the main page is open
        When user starts typing in the city textbox
        Then the user should see a list of cities (suggestions) that match what they’ve typed

    Scenario 3: User can select a city from the suggested list.
        As a user,
        I should be able to “filter events by city”
        So that I can see the list of events that take place in that city

Key Feature 2: Show/hide event details.

    Scenario 1: An event element is collapsed by default
        Given a user is on the homepage or viewing events in a search
        When the user views or scrolls through the list of events
        Then they will not see any more details about the events

    Scenario 2: User can expand an event to see its details
        Given a user is viewing a list of events
        When a user clicks on the event or a “show more details” button
        Then they will see more details about the event

    Scenario 3: User can collapse an event to hide its details
        Given a user is looking at the details of the event
        When a user selects the “hide details” or other close button
        Then they will be no longer see the details of the event

Key Feature 3: Specify number of events.

    Scenario 1: When user hasn’t specified a number, 32 is the default number
        Given a user has not specified a number of events
        When a user opens the app or searches for events
        Then they will see 32 events by default

    Scenario 2: User can change the number of events they want to see
        Given a user is looking at the list of events on the homepage
        When a user changes the number of events to be seen
        Then they will see the list has changed to their chosen number of events

Key Feature 4: Use the app when offline.

    Scenario 1: Show cached data when there’s no internet connection
        Given a user has no internet connection
        When a user tries to use the app
        Then they will be able to still use it offline

    Scenario 2: Show error when user changes the settings (city, time range)
        Given a user has no internet connection
        When a user tries to change the city or time range
        Then they will receive an error message letting them know this is not possible without an internet connection

Key Feature 5: View a chart showing the number of upcoming events by city.

    Scenario 1: Show a chart with the number of upcoming events in each city
        Given a number of events have been listed for each city

When a user selects a particular city
Then they will see a chat displaying the number of events per city

## User Stories

As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city.

As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.

As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.

As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.

As a user, I would like to be able to add the app shortcut to my home screen so that I can open the app faster.

As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.
