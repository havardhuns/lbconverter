const Logo = (props) => {
  return (
    <div style={{ cursor: "pointer" }} onClick={props.onClick}>
      <h1>MovieFilter</h1>
    </div>
  );
};

export default Logo;
