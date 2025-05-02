import { createSelector } from '@reduxjs/toolkit';
/**
 * Selector to determine if "Send for Approval" should be shown.
 *
 * Usage:
 * const sendForApproval = useSelector(state =>
 *   selectShouldSendForApproval(state, { mode, data })
 * );
 *
 * @param {object} state
 * @param {{mode: 'single'|'bulk', data: Array<{ validFrom: string, validTill: string, creditLimit: number }>} } props
 */
export const selectShouldSendForApproval = createSelector(
  state => state.user.user.singleCardApproval,
  state => state.user.user.bulkCardApproval,
  state => state.user.user.approvalThresholds,
  state => state.user.user.cardLimitRule,
  state => state.user.user.cardValidityRule,
  (_state, props) => props.mode,
  (_state, props) => props.data,
  (
    singleCardApproval,
    bulkCardApproval,
    approvalThresholds,
    cardLimitRule,
    cardValidityRule,
    mode,
    data
  ) => {
    // 1) Is approval flow enabled for this mode?
    const flowEnabled = mode === 'bulk' ? bulkCardApproval : singleCardApproval;
    if (!flowEnabled) return false;

    // 2) Compute total credit limit
    const totalLimit = data.reduce(
      (sum, { creditLimit }) => sum + (Number(creditLimit) || 0),
      0
    );

    // 3) Check if any validity span (in days) exceeds the rule
    const anyTooLong =
      cardValidityRule != null && data.some(item => {
        const fromDate = new Date(item.validFrom);
        const tillDate = new Date(item.validTill);
        const diffMs = tillDate - fromDate;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        return diffDays > cardValidityRule;
      });

    // 4) Apply the selected threshold rule
    switch (approvalThresholds) {
      case 1: // credit-limit only
        return totalLimit > cardLimitRule;
      case 2: // validity-days only
        return anyTooLong;
      case 3: // both must trigger
        return totalLimit > cardLimitRule && anyTooLong;
      case 4: // either one is enough
        return totalLimit > cardLimitRule || anyTooLong;
      default:
        return false;
    }
  }
);
