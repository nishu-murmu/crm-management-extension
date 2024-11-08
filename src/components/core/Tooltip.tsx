import { Tooltip } from 'react-tooltip';

const TooltipComponent = ({
  id,
  content,
  variant,
  hoverElement,
  placement,
  contentData,
  className,
}: {
  id?: any;
  content?: any;
  variant?: any;
  hoverElement?: any;
  placement?: any;
  contentData?: any;
  className?: string;
}) => {
  return (
    <>
      <div
        className="cp-flex cp-items-center"
        data-tooltip-id={id}
        data-tooltip-content={content}
        data-tooltip-variant={variant}
        data-tooltip-place={placement}
      >
        {hoverElement}
      </div>

      <Tooltip
        id={id}
        clickable
        className={`!cp-mt-0 !cp-max-w-[250px] !cp-p-2 !cp-w-fit !cp-rounded-lg !cp-text-13px !cp-bg-blue-800 !cp-opacity-100 !cp-z-10 ${
          className && className
        }`}
      >
        <p dangerouslySetInnerHTML={{ __html: contentData }}> </p>
      </Tooltip>
    </>
  );
};

export default TooltipComponent;
