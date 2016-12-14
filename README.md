# Lyx-api

## Description:

Lyx provides data for events based on location, performers or performer events.Using data from a 3rd party api, filters it and it brings out only the important information. Searhcing for perofrmer events is being simplified, insted of going through the trouble of looking for a performer ID in order to get their events, Lyx is doing that for you. By simply typing in the performers name, it automatically finds the performers ID and returns the events. The api also allowes you to create a favourites list with GET, POST, PUT and DELETE requests.

## External API used:

Eventim

## Examples:

Requesting event wth location: https://lyx-api.herokuapp.com/events?l=London , where 'l' is the parameter.
Requesting perofrmer details: https://lyx-api.herokuapp.com/performer?p=Skrillex , where 'p' is the parameter. It returns 'title', 'genre', 'image', 'id'.
Request performer events:https://lyx-api.herokuapp.com/events?p=Skrillex ,where 'p' is the parameter. It returns 'country', 'region', 'start_time', 'city', 'all_day', 'url', 'stop_time', 'id' and title.
Add performer to favourites: POST https://lyx-api.herokuapp.com/favorites?name=Rihanna , where 'name' is the parameter.
Getting the favourites list: GET: https://lyx-api.herokuapp.com/favorites , with no parameters.
Deleting a favourite from your list: PUT:  https://lyx-api.herokuapp.com/favorites , with body 'name: Rihanna' will remove Rihanna from the list.
Deleting the whole favourites list: DELETE:  https://lyx-api.herokuapp.com/favorites , with no parameters.

### The api requires basic authorisation.

