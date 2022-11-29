import "./Spinner.scss";

export function Spinner() {
  return (
    <div class="spinner-wrapper">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
