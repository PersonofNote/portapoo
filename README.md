<!-- ABOUT THE PROJECT -->
## About The Project

Porta-Poo

My friend wanted a project where they could add bathroom locations. I needed a reason to learn Svelte.

### Built With

* [![Svelte][SvelteKit]][https://kit.svelte.dev/]
* [![Svelte Motion][Svelte Motion]][https://svelte-motion.gradientdescent.de/]
* [![Mongo][MongoDb]][https://www.mongodb.com/]
* [![Leaflet][Leaflet]][https://leafletjs.com/]


### Features List
* [x] Map with markers
* [x] Fetch markers from database/render with popup
* [x] Draggable overlay like google maps
* [] User submission of new markers
  - Form with data
  - Image upload
  - Captcha or other verification method
  - Data sanitization
  - Some method of flagging?
  - Consider how to verify. Should this only be members who have signed up?
  - How to enable a user to delete their own posts? Should that be a feature, even?
* [] User editing of markers
  - Shouldn't be able to overwrite, but can add new photos and reviews, as well as verification
  - Star ratings should be aggregated from all ratings for an entry.
    - Question: should each rating be associated with an individual review, or is just a list of numbers ok?
    - I think probably reviews should be their own thing. A one-to-many with both a user key and a potty key?
  - At first we should probably flag everything and manually check it
* [] Marker info display: short veresion in popup, longer version plus option to leave review/add photos/see gallery in card
* [] Default card display: No marker selected, card should show different things
* [] Marker add shortcut: Long press should bring up form with lat/long filled in
* [] Bottom tray with options
  - [] Base tray
  - [] Icons
  - [] Icons that actually do stuff
* [] Donation functionality, probably in the bottom try but maybe also other places?
* [] Eventually directions would be a great feature - need to check costs and difficulty of implementation
* [] Admin dashboard where authed users can see flagged posts and review stuff, delete if necessary