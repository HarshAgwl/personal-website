<script>
  import { TextInput } from "carbon-components-svelte";

  import { Router, Route } from "svelte-routing";

  import ToastNotifications from "./components/ToastNotifications";
  import WyswigEditor from "./components/WyswigEditor";

  import AdminHome from "./pages/Home";
  import ListingPageTemplate from "./templates/ListingPage";
  import CreateEditPageTemplate from "./templates/CreateEditPage";

  import { toastNotifications } from "./stores/globalStore";

  import { searchPosts, readPost, savePost } from "./utils/api/posts";

  import { saveToDb } from "./utils/database";

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

<ToastNotifications />
<Router>
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
      tableName="posts" />
  </Route>
  <Route path="/admin">
    <AdminHome />
  </Route>
</Router>
