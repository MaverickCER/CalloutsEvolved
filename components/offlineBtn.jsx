const OfflineBtn = ({
  btn,
  isShift,
  label,
  sessionAction,
  sessionButton,
  theme,
  triggerAction,
}) => {
  return (
    <button
      id={`calloutBtn${btn.toUpperCase()}`}
      type="button"
      onClick={() => {
        triggerAction(btn, isShift);
      }}>
      <span
        style={{
          backgroundImage: sessionAction?.timestamp
            ? sessionAction?.isShift
              ? sessionButton?.images
                ? `url("${sessionButton?.images}")`
                : 'none'
              : sessionButton?.image
              ? `url("${sessionButton?.image}")`
              : 'none'
            : 'none',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundColor:
            sessionAction?.timestamp || sessionButton?.type === 'shift'
              ? sessionButton?.type === 'timer'
                ? sessionAction?.dura > sessionButton?.time * 0.66
                  ? `rgb(${theme.cbc})`
                  : sessionAction?.dura > sessionButton?.time * 0.33
                  ? `rgb(${theme.cbb})`
                  : sessionAction?.dura > -1
                  ? `rgb(${theme.cba})`
                  : 'none'
                : sessionButton?.type === 'shift'
                ? isShift
                  ? `rgb(${theme['cb' + sessionButton?.color]})`
                  : 'transparent'
                : sessionAction?.isShift
                ? sessionButton?.colors
                  ? `rgb(${theme['cb' + sessionButton?.colors]})`
                  : 'transparent'
                : sessionButton?.color
                ? `rgb(${theme['cb' + sessionButton?.color]})`
                : 'transparent'
              : 'transparent',
          color:
            sessionAction?.timestamp || sessionButton?.type === 'shift'
              ? sessionButton?.type === 'timer'
                ? sessionAction?.dura > sessionButton?.time * 0.66
                  ? `rgb(${theme.ccc})`
                  : sessionAction?.dura > sessionButton?.time * 0.33
                  ? `rgb(${theme.ccb})`
                  : sessionAction?.dura > -1
                  ? `rgb(${theme.cca})`
                  : 'none'
                : sessionButton?.type === 'shift'
                ? isShift
                  ? `rgb(${theme['cc' + sessionButton?.color]})`
                  : `rgb(${theme.mca})`
                : sessionAction?.isShift
                ? sessionButton?.colors
                  ? `rgb(${theme['cc' + sessionButton?.colors]})`
                  : `rgb(${theme.mca})`
                : sessionButton?.color
                ? `rgb(${theme['cc' + sessionButton?.color]})`
                : `rgb(${theme.mca})`
              : `rgb(${theme.mca})`,
        }}>
        <section
          style={{
            backgroundColor:
              sessionAction?.timestamp || sessionButton?.type === 'shift'
                ? sessionButton?.type === 'timer'
                  ? sessionAction?.dura > sessionButton?.time * 0.66
                    ? `rgb(${theme.cbc})`
                    : sessionAction?.dura > sessionButton?.time * 0.33
                    ? `rgb(${theme.cbb})`
                    : sessionAction?.dura > -1
                    ? `rgb(${theme.cba})`
                    : 'none'
                  : sessionButton?.type === 'shift'
                  ? isShift
                    ? `rgb(${theme['cb' + sessionButton?.color]})`
                    : 'transparent'
                  : sessionAction?.isShift
                  ? sessionButton?.colors
                    ? `rgb("${sessionButton?.colors}")`
                    : 'transparent'
                  : sessionButton?.color
                  ? `rgb("${sessionButton?.color}")`
                  : 'transparent'
                : 'transparent',
            color:
              sessionAction?.timestamp || sessionButton?.type === 'shift'
                ? sessionButton?.type === 'timer'
                  ? sessionAction?.dura > sessionButton?.time * 0.66
                    ? `rgb(${theme.ccc})`
                    : sessionAction?.dura > sessionButton?.time * 0.33
                    ? `rgb(${theme.ccb})`
                    : sessionAction?.dura > -1
                    ? `rgb(${theme.cca})`
                    : 'none'
                  : sessionButton?.type === 'shift'
                  ? isShift
                    ? `rgb(${theme['cc' + sessionButton?.color]})`
                    : `rgb(${theme.mca})`
                  : sessionAction?.isShift
                  ? sessionButton?.colors
                    ? `rgb(${theme['cc' + sessionButton?.colors]})`
                    : `rgb(${theme.mca})`
                  : sessionButton?.color
                  ? `rgb(${theme['cc' + sessionButton?.color]})`
                  : `rgb(${theme.mca})`
                : `rgb(${theme.mca})`,
          }}>
          <small>
            {label}
            {sessionAction?.timestamp || (sessionButton?.type === 'shift' && isShift)
              ? sessionButton?.type === 'shift'
                ? sessionButton?.color
                  ? ` (${sessionButton?.color.toUpperCase()})`
                  : ''
                : sessionButton?.type === 'timer'
                ? sessionAction?.dura > sessionButton?.time * 0.66
                  ? ` (C)`
                  : sessionAction?.dura > sessionButton?.time * 0.33
                  ? ` (B)`
                  : sessionAction?.dura > -1
                  ? ` (A)`
                  : ''
                : sessionAction?.isShift
                ? sessionButton?.colors
                  ? ` (${sessionButton?.colors.toUpperCase()})`
                  : ''
                : sessionButton?.color
                ? ` (${sessionButton?.color.toUpperCase()})`
                : ''
              : ''}
            : {sessionAction?.displayName ? sessionAction?.displayName : ''}
          </small>
          <p>
            {sessionButton?.type === 'timer'
              ? sessionAction?.timestamp
                ? sessionAction?.isShift
                  ? Math.floor(Date.now() - sessionAction?.timestamp) < 250
                    ? sessionButton?.texts
                      ? sessionButton?.texts
                      : ''
                    : sessionAction?.dura
                  : Math.floor(Date.now() - sessionAction?.timestamp) < 250
                  ? sessionButton?.text
                    ? sessionButton?.text
                    : ''
                  : sessionAction?.dura
                : isShift
                ? sessionButton?.texts
                  ? sessionButton?.texts
                  : ''
                : sessionButton?.text
                ? sessionButton?.text
                : ''
              : sessionAction?.timestamp
              ? sessionAction?.isShift
                ? sessionButton?.texts
                  ? sessionButton?.texts
                  : ''
                : sessionButton?.text
                ? sessionButton?.text
                : ''
              : isShift
              ? sessionButton?.texts
                ? sessionButton?.texts
                : ''
              : sessionButton?.text
              ? sessionButton?.text
              : ''}
          </p>
        </section>
      </span>
    </button>
  );
};

export default OfflineBtn;
