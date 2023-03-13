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
- can also use Link to put search params into the URL

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

### NavLink:
- works like Link, also comes from react-router-dom
- in addition to propery **"to"** for where to navigate, it can also take a **className** (which can take a function)
  - react router will pass this function an object with an "isActive" property - Boolean if that route is the active route
  ```
  <NavLink to="/about" className={({isActive}) => isActive ? "my-link" : null}>
  </NavLink>
  ```
  - can also take inline style prop (can also use **isActive** to enable a specific inline style for that)
  - there is also an **isLoading** prop you could use
  - another interesting property to keep in mind is **end** which signifies this is the end of the URL match. In other words, if I only wanted a style to match */host* and not */host/income*, I could use **end** as a property on the NavLink for */host* and it would only match that specific URL
  - with NavLink and Link in the **to** property, you can use some CLI shortcuts (**.** means same directory, **..** means parent directory)
  ```
  <Link to=".">Dashboard</Link>
  ```
  - when using this ^, if you want to go back in the directory according the **relative (not absolute) path** and not the **nested Routes**, you can say so with the **relative** property:
  ```
  <Link
    to=".."
    relative="path"
  >Back to vans</Link>
  ```

  ### useOutletContext:
  - when needing to pass your outlet the **context**, you can then invoke the **useOutletContext** function in the child component, thus passing in any pertinent info
  [Documentation Here](https://reactrouter.com/en/main/hooks/use-outlet-context)
  ```
  <Outlet content={{ van }}>
  ```
  ```
  import { useOutletContext } from "react-router-dom"

  const { van } = useOutletContext()
  ```

  ### useSearchParams:
  - import this from "react-router-dom" if you want to grab search params from the URL
  ```
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type")
  ```
  - in order to get the URL to show the search param you want, you can use Link:
  ```
  <Link to="?type=rugged">Rugged</Link>
  ```
  - this is useful when creating filter options
  - if you want a "clear" option to clear out search params, you can make a path in two ways:
  ```
  <Link to="">Clear</Link>
  <Link to=".">Clear</Link>
  ```
  - if Link feels too hard-coded, you can do this with setSearchParams in a few ways:
    1. put the string into setSearchParams (no question mark needed, it's smart enough to figure this out. If you want to put the ?, that's fine, too. Clear would just be an empty string - the "." is specific to React Router and would not work here)
    ```
    <button onClick={() => setSearchParams("type=rugged)}>Rugged</button>
    ```
    2. record initialization / object initialization: use key value pairs (a clear would just be an empty object)
    ```
    <button onClick={() => setSearchParams({type: "rugged"})}>Rugged</button>
    ```
    3. and more - probably a template literal could work, too

  - a word to the wise: the above methods will completely clear out other searchParams, so if you are planning on having more than one param, there is more to this. This brings us to the next tactic:

    4. make a function to generate the search params, call this function in your Link passing in the key and value desired. In order to do this, you will need to use URLSearchParams from the URL API. This will keep any other searchParams in tact.
    [URLSearchParams Documentation Here](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
    ```
    function genNewSearchParamString(key, value) {

      //we can use the previous searchParams as an argument
      const sp = new URLSearchParams(searchParams)

      //if we are clearing this out, delete the key from the URL
      if (value === null) sp.delete(key)

      //otherwise set the key value pair in the search params
      else sp.set(key, value)

      return `?${sp.toString()}`
    }

    <Link to={genNewSearchParamString("type", "rugged")}>Rugged</Link>
    <Link to={genNewSearchParamString("type", null)}>Clear</Link>
    ```
      - side note: a function like genNewSearchParamString would be great to lift out of the Component and put in a utils folder, as you might need to use its functionality in many places in your app
      - here's another example of the above but with buttons and setSearchParams:
      ```
      function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
          if (value === null) prevParams.delete(key)
          else prevParams.set(key, value)
          return prevParams
        })
      }

      <button onClick={() => handleFilterChange("type", "rugged")}>Rugged</button>
      <button onClick={() => handleFilterChange("type", null)}>Clear</button>
      ```
      - another side note here: yes, this is modifying the previous searchParams and yes, that is ok. ALSO, if you have two keys with the same name and hit clear, it will clear out both. There's a way to work around this, but we're not learning it here today.

   - What if you want to pass the search params, or hold on to them? (One use case for this is a back button - when the user clicks back, you want the same search params to repopulate as opposed to them having to refilter). You can do this using the state property in Link:
   *This state is not React state! It is part of the browser's own capability.*
   ```
   <Link to={van.id} state={{  search: `?${searchParams.toString()}` }}>
   ```
   ^ this passes the state to the next component
   ...then we want to use the **useLocation** hook in the component we are passing state to like so:
   ```
   //remember to import the hook
   import { useLocation } from "react-router-dom"

   //invoke it
   const location = useLocation()

   //make a variable to grab the state using chaining conditional logic
   const search = location.state?.search || ""

   //then use this in the Link to path for clicking back
   <Link to={`..${search}`} relative="path">Back to all vans</Link>
   ```
   [useLocation Documentation Here](https://reactrouter.com/en/main/hooks/use-location)

### Catch-All Path:
- One way to handle any paths that deviate from your prescripted paths is to use a catchall with an asterisk:
```
<Route path="*" element={<h1>Page not found!</h1>} />
```
this should be nested in your routes, React will know where to nest it according to your other components

### Loaders:
- ok here is where things are starting to get a little tricky. So far, we've been living in the world of BrowserRouter, but this does not support React Router's new data APIs. [Documentation here for more context.](https://reactrouter.com/en/main/routers/picking-a-router) In order to start making use of these data APIs, we are going to use **createBrowserRouter**. This will also require us to use **createRoutesFromElements** and **RouterProvider**.
- first, import the three bolded functions / components named above from react-router-dom
- then create the router object:
```
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}> />
  )
}
```
<sub>All of the routes (including nested routes) are arguments in the createRoutesFromElements function, which under the hood will make them an object (with nested objects if there are child routes).</sub>
- when you use the loader property, you are indicating to React Router that you want it to delay the rendering of that component until it has the data
- now we can grab the data we want from the API without needing a useEffect, a loading state, or other data states.

```
import { getVans } from "../../api"
export function loader() {
  return getVans()
}

export default function Vans() {
  const vans = useLoaderData()
}
```
<sub>The above code block is in Vans.jsx. You'll need to import useLoaderData. In index.jsx, do the following:</sub>

```
import Vans, { loader as vansLoader } from "./pages/Vans/Vans"

<Route path="vans" element={<Vans />} loader={vansLoader} />
```

### errorElement Prop:
- in your Route, you can provide an **errorElement** prop (just like you provide an **element** prop) for error handling with a better user experience
- this will show as a component anytime that component has an error

#### Other Findings:
- Netlify is a good free and easy option for deplyment from GitHub
- Mirage JS (dependency here) acts as a mock server for api requests
- you can set state for loading and do an early return of a div for loading for smoother user interface
- Remix is something worth checking out (tied to loaders?)


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
