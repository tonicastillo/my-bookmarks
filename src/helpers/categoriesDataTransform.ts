import type { CategoryProp } from "../types";


const categoriesDataTransform = (categoriesRawData: Array<any>) => {
  const getCatName = (catId:string) => {
    const cat = categoriesRawData.find(c => (c.id === catId))
    return cat.properties.Name.title.length ? cat.properties.Name.title[0].text.content : '---'
  }
  return categoriesRawData.map((c: any) => {
    const props = c.properties;
    const category: CategoryProp = {
      nid: c.id,
      name: props.Name.title.length ? props.Name.title[0].text.content : '---',
      order: props.Order.number,
      level: props.Level.number,
    };
    if(props.Hijo.relation.length){
      category.children = props.Hijo.relation.map((cat:any) => ({
        nid: cat.id,
        name: getCatName(cat.id)
      }))
      
    }
    return category;
  });
}
export default categoriesDataTransform;

// {
//   "object": "page",
//   "id": "7b45c93f-6ca7-4a54-8cc0-1f91c81e49b8",
//   "created_time": "2023-10-06T14:06:00.000Z",
//   "last_edited_time": "2023-10-06T14:06:00.000Z",
//   "created_by": {
//       "object": "user",
//       "id": "acf47475-df82-49c3-8c79-f9e5c2aeea03"
//   },
//   "last_edited_by": {
//       "object": "user",
//       "id": "acf47475-df82-49c3-8c79-f9e5c2aeea03"
//   },
//   "cover": null,
//   "icon": null,
//   "parent": {
//       "type": "database_id",
//       "database_id": "8ff5170e-b891-4542-a1fd-04b4da92c0b1"
//   },
//   "archived": false,
//   "properties": {
//       "Order": {
//           "id": "De%7Dd",
//           "type": "number",
//           "number": null
//       },
//       "Padre": {
//           "id": "H%7BQV",
//           "type": "relation",
//           "relation": [
//               {
//                   "id": "b55f6663-a461-460d-8f60-b16217c0b646"
//               }
//           ],
//           "has_more": false
//       },
//       "Hijo": {
//           "id": "TwFX",
//           "type": "relation",
//           "relation": [],
//           "has_more": false
//       },
//       "Level": {
//           "id": "XJWc",
//           "type": "number",
//           "number": 2
//       },
//       "Name": {
//           "id": "title",
//           "type": "title",
//           "title": [
//               {
//                   "type": "text",
//                   "text": {
//                       "content": "Servers",
//                       "link": null
//                   },
//                   "annotations": {
//                       "bold": false,
//                       "italic": false,
//                       "strikethrough": false,
//                       "underline": false,
//                       "code": false,
//                       "color": "default"
//                   },
//                   "plain_text": "Servers",
//                   "href": null
//               }
//           ]
//       }
//   },
//   "url": "https://www.notion.so/Servers-7b45c93f6ca74a548cc01f91c81e49b8",
//   "public_url": null
// }