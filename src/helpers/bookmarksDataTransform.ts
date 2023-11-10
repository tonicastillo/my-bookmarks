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
        typeof props.AlternateURL.url === "string" &&
        props.AlternateURL.url !== props.URL.url
          ? props.AlternateURL.url
          : "",
      imageUrl: imageUrl,
      name: props.Name.title[0].text.content,
      notionUrl: b.url,
      isAtStart: props["Visible at Start"].checkbox,
      tags: props.Tags["multi_select"],
      description: description,
    };
    return bookmark;
  });

export default bookmarksDataTransform;
