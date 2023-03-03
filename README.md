Quick start:

```
$ npm install
$ npm start
```

# My Notes:
## Purpose:
I'm completing this project to practice React skills, specifically React Router.

## Notes:
### General:
- Routes allow you to have a Single Page Application

### Route:
- path specifies URL and element names component to render
- any children of Route components must also be Route components
- the parent route will render, then any child route will render according to the path we are on!

### Link:
- allows you to load different components with **no refresh**

### Params:
- React built in Hook useParams() pulls the params as variables from the URL
- useParams() returns an object, the keys are the variable names according to the Route path and the values are determined from the URL
- you can have multiple params from a single path
```
/vans/:id/:type

{vans: {id: '2', type: 'rugged'}}
```

### Nested Routes:
- Handy when you want to keep some elements (like a sidebar) and switch out others
- An essential psrt of SPAs
- DRY because you're not repeating components in code
- Outlet is a component from react-router-dom that allows you to show where on your page you want child components to render
```
import { Outlet } from "react-router-dom"

<Header />
<Outlet />
```
<sub>In this example the header is the parent, rednering for all pages, and the outlet holds the place for whatever child component needs to render according to the path</sub>

- when you start nesting routes, the paths can become super clunky:
```
path="/host/:hostId/vans/:vanId"
```
- a better way to handle this is to switch to **relative** paths (anything the parent already has as a path you can delete, leaving only the rest of the path for the child)
```
<Route path="/host" element={<HostLayout />}>
  <Route path="" element={<Dashboard />} />
  <Route path="income" element={<Income />} />
</Route>
```
- if you want a child route to have the same path of the parent, you can use use the **index property**
```
<Route index element={<Dashboard />} />
```
- a **Layout Route** is the parent route of some nested routes that contains just the portion of the UI that will be shared. It uses an Outlet component.

#### Other Findings:
- Netlify is a good free and easy option for deplyment from GitHub
- Mirage JS (dependency here) acts as a mock server for api requests


##### This Project is from Scrimba
<sub>Their details below:</sub>

Warning: Vite enforces using jsx syntax inside jsx/tsx files, so it will complain about that. Solution: rename `.js` files to `.jsx` :)

Head over to https://vitejs.dev/ to learn more about using vite
###### About Scrimba

At Scrimba our goal is to create the best possible coding school at the cost of a gym membership! 💜
If we succeed with this, it will give anyone who wants to become a software developer a realistic shot at succeeding, regardless of where they live and the size of their wallets 🎉
The Frontend Developer Career Path aims to teach you everything you need to become a Junior Developer, or you could take a deep-dive with one of our advanced courses 🚀

- [Our courses](https://scrimba.com/allcourses)
- [The Frontend Career Path](https://scrimba.com/learn/frontend)
- [Become a Scrimba Pro member](https://scrimba.com/pricing)

Happy Coding!
