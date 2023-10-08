import type { BookmarkProp } from "../types";

const bookmarksDataTransform = (bookmarksRawData: any) =>
  bookmarksRawData.map((b: any) => {
    const props = b.properties;
    let imageUrl: string = "";
    if (
      props?.image &&
      props.image?.type === "files" &&
      props.image.files &&
      props.image.files.length
    ) {
      const type = props.image.files[0].type;
      imageUrl = props.image.files[0][type]?.url || "";
    }
    let description: string = "";
    if (
      props?.Subtitle &&
      props.Subtitle["rich_text"] &&
      props.Subtitle["rich_text"].length
    ) {
      description = props.Subtitle["rich_text"][0].text?.content || "";
    }
    let catId: string = "";
    if (props?.Category?.relation && props?.Category?.relation.length) {
      catId = props?.Category?.relation[0].id;
    }
    const bookmark: BookmarkProp = {
      nid: b.id,
      catId: catId,
      url: props.URL.url,
      alternateUrl:
        typeof props.AlternateURL.url === "string"
          ? props.AlternateURL.url
          : "",
      imageUrl: imageUrl,
      name: props.Name.title[0].text.content,
      notionUrl: props.url,
      isAtStart: props["Visible at Start"].checkbox,
      tags: props.Tags["multi_select"],
      description: description,
    };
    return bookmark;
  });

export default bookmarksDataTransform;

// {
//     "object": "page",
//     "id": "5c4c31e1-61ef-4fb0-b13a-52a8e80b00d6",
//     "created_time": "2023-10-02T15:38:00.000Z",
//     "last_edited_time": "2023-10-02T15:38:00.000Z",
//     "created_by": {
//         "object": "user",
//         "id": "acf47475-df82-49c3-8c79-f9e5c2aeea03"
//     },
//     "last_edited_by": {
//         "object": "user",
//         "id": "acf47475-df82-49c3-8c79-f9e5c2aeea03"
//     },
//     "cover": null,
//     "icon": null,
//     "parent": {
//         "type": "database_id",
//         "database_id": "10a789da-9045-4013-829f-cba8b567046b"
//     },
//     "archived": false,
//     "properties": {
//         "Category": {
//             "id": "%3DBCY",
//             "type": "relation",
//             "relation": [
//                 {
//                     "id": "49d07e03-db7d-44a3-9991-fac201562793"
//                 }
//             ],
//             "has_more": false
//         },
//         "imageUrl": {
//             "id": "%3DJFf",
//             "type": "formula",
//             "formula": {
//                 "type": "string",
//                 "string": "https://s2.googleusercontent.com/s2/favicons?domain_url=https://creativecloud.adobe.com/cc/photoshop"
//             }
//         },
//         "Status": {
//             "id": "%3FJ%5C%3D",
//             "type": "status",
//             "status": {
//                 "id": "a49e8627-9aef-4648-8d55-78f7131be2c6",
//                 "name": "Not started",
//                 "color": "default"
//             }
//         },
//         "image": {
//             "id": "AOVO",
//             "type": "files",
//             "files": [
//                 {
//                     "name": "96x96.png",
//                     "type": "external",
//                     "external": {
//                         "url": "https://ffc-static-cdn.oobesaas.adobe.com/icons/PHSP/24.6/96x96.png"
//                     }
//                 }
//             ]
//         },
//         "URL": {
//             "id": "HlGL",
//             "type": "url",
//             "url": "https://creativecloud.adobe.com/cc/photoshop"
//         },
//         "Visible at Start": {
//             "id": "%5EE%7C~",
//             "type": "checkbox",
//             "checkbox": true
//         },
//         "Tags": {
//             "id": "bV%3C_",
//             "type": "multi_select",
//             "multi_select": [
//                 {
//                     "id": "cb3c97e5-8adf-4ef9-a0ca-1fd6ddc30af8",
//                     "name": "DesignTools",
//                     "color": "default"
//                 }
//             ]
//         },
//         "imageUrlBase": {
//             "id": "ddfR",
//             "type": "url",
//             "url": null
//         },
//         "Valoration": {
//             "id": "iv%3BO",
//             "type": "select",
//             "select": null
//         },
//         "Created time": {
//             "id": "kESn",
//             "type": "created_time",
//             "created_time": "2023-10-02T15:38:00.000Z"
//         },
//         "Subtitle": {
//             "id": "lbJO",
//             "type": "rich_text",
//             "rich_text": [
//                 {
//                     "type": "text",
//                     "text": {
//                         "content": "Adobe Creative Cloud",
//                         "link": null
//                     },
//                     "annotations": {
//                         "bold": false,
//                         "italic": false,
//                         "strikethrough": false,
//                         "underline": false,
//                         "code": false,
//                         "color": "default"
//                     },
//                     "plain_text": "Adobe Creative Cloud",
//                     "href": null
//                 }
//             ]
//         },
//         "AlternateURL": {
//             "id": "vrh%40",
//             "type": "url",
//             "url": null
//         },
//         "Name": {
//             "id": "title",
//             "type": "title",
//             "title": [
//                 {
//                     "type": "text",
//                     "text": {
//                         "content": "Photoshop",
//                         "link": null
//                     },
//                     "annotations": {
//                         "bold": false,
//                         "italic": false,
//                         "strikethrough": false,
//                         "underline": false,
//                         "code": false,
//                         "color": "default"
//                     },
//                     "plain_text": "Photoshop",
//                     "href": null
//                 }
//             ]
//         }
//     },
//     "url": "https://www.notion.so/Photoshop-5c4c31e161ef4fb0b13a52a8e80b00d6",
//     "public_url": null
// }
