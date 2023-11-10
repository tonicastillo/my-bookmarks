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