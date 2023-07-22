export function RenderButtons({ isVisible, setVisible, icon, title }) {
  return (
    <button
      className=" btn-design "
      onClick={ () => { setVisible(!isVisible); console.log(isVisible); } }
    >
      {icon()}
      <h4 className="p-1 tam-title ">{title}</h4>

    </button>

  );
}
