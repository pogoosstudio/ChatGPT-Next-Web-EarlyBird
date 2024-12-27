export const ModelAvatar = (props: { model: ModelType }) => {
  return <MaskAvatar avatar="default-avatar" model={props.model.name} />;
};
