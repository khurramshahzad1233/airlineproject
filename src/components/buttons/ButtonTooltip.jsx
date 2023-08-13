import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function ButtonTooltip({ title, name, icon, className }) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {title}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button variant="..." className={className}>
        {icon && <i className={`fas ${icon}`}></i>}
        {name && name}
      </Button>
    </OverlayTrigger>
  );
}

export default ButtonTooltip;
