const SectionTitle3 = (props) => {
  return (
    <div className="row">
      <div className="wpo-section-title-s3">
        <span>{props.subTitle}</span>
        <h2 style={{ color: "black" }}>{props.MainTitle}</h2>
      </div>
    </div>
  );
};

export default SectionTitle3;
