<script>
  import {
    Content, TextInput
  } from "carbon-components-svelte";
  import { Router, Route } from 'svelte-routing';

  import ToastNotifications from "./components/ToastNotifications";
  import WyswigEditor from "./components/WyswigEditor";

  import Sidebar from "./components/Sidebar/index.svelte";
  import Theme from "./components/Theme.svelte";

  import Home from './pages/Home/index.svelte';
  import About from './pages/About/index.svelte';
  import Work from './pages/Work/index.svelte';
  import Videos from './pages/Videos/index.svelte';
  import Post from './pages/Post/index.svelte';

  import AdminHome from "./pages/AdminHome";
  import ListingPageTemplate from "./templates/ListingPage";
  import CreateEditPageTemplate from "./templates/CreateEditPage";

  import { toastNotifications } from "./stores/globalStore";

  import { searchPosts, readPost, savePost } from "./utils/api/posts";

  import { saveToDb } from "./utils/database";

  let theme = "g10";

  const generateSaveFunc = (toastNotifications, saveAPIFunc) => 
  (mongoDocument) => {
    saveToDb(mongoDocument, saveAPIFunc, toastNotifications);
  };

  const propsForPostForm = {
    tableName: "posts",
    readDocumentFunc: readPost,
    formElements: [
      {
        component: TextInput,
        fieldName: "createdOn",
        additionalComponentProps: {
          type: "date"
        }
      },
      {
        component: TextInput,
        fieldName: "title",
        additionalComponentProps: {},
      },
      {
        component: WyswigEditor,
        fieldName: "body",
        additionalComponentProps: {
          id: "body",
        },
      },
      {
        component: WyswigEditor,
        fieldName: "teaser",
        additionalComponentProps: {
          id: "teaser",
        },
      },
    ],
    saveFunc: generateSaveFunc(toastNotifications, savePost),
  };
</script>

<style>
  @import 'style.css';
  .grid{
    display: grid;
    grid-template-columns: 17.5% 82.5%;
    grid-template-rows: 100vh;
  }
  :global(.content){
    height: 100vh!important;
    overflow-y: scroll;
  }
  @media (max-width: 960px){
    .grid{
      grid-template-columns: 100%;
      grid-template-rows: inherit;
    }
    :global(.content){
      height: auto!important;
    }
  }
</style>

<Theme persist bind:theme>
  <Router>
  <div class="grid">
    <Sidebar />
      <ToastNotifications />
      <Route path="/post/:id" let:params>
        <Post id={params.id}/>
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/work">
        <Work />
      </Route>
      <Route path="/videos">
        <Videos />
      </Route>
      <Route path="/admin/posts/add">
        <CreateEditPageTemplate
          mode="Add"
          {...propsForPostForm}
        />
      </Route>
      <Route path="/admin/posts/edit/:id" let:params>
        <CreateEditPageTemplate
          mode="Edit"
          id={params.id}
          {...propsForPostForm}
        />
      </Route>
      <Route path="/admin/posts">
        <ListingPageTemplate
          selfUrl="/admin/posts"
          searchFunc={searchPosts}
          tableName="posts" 
        />
      </Route>
      <Route path="/admin">
        <AdminHome />
      </Route>
      <Route path="/" component="{Home}"/>
  </div>
</Router>
</Theme>
