import React from 'react';
import classNames from 'classnames';

const PasswordPolicyList = props => {
  let passwordPolicyList = [];
  const { passwordPolicies } = props;

  const passwordPolicySatisfied = passwordPolicy => {
    let { password } = props;
    return passwordPolicy.predicate(password);
  };

  const principleClass = passwordPolicy => {
    let satisfied = passwordPolicySatisfied(passwordPolicy);

    return classNames({
      'text-success': satisfied,
      'text-danger': !satisfied,
    });
  };

  if (passwordPolicies.minimumLength > 0) {
    passwordPolicyList.push({
      label: `Minimum password length ${passwordPolicies.minimumLength}`,
      predicate: password => password.length >= 4,
    });
  }

  if (passwordPolicies.maximumLength > 0) {
    passwordPolicyList.push({
      label: `Maximum password length ${passwordPolicies.maximumLength}`,
      error: 'Password must be less than 10 characters',
      predicate: password =>
        password.length <= passwordPolicies.maximumLength &&
        password.length >= passwordPolicies.minimumLength,
    });
  }

  if (passwordPolicies.minimumUpperCase > 0) {
    let regexUpper = `^(.*?[A-Z]){${parseInt(passwordPolicies.minimumUpperCase)},}`;
    const UPPERCASE_REGEX = new RegExp(regexUpper);
    passwordPolicyList.push({
      label: `Must have at least ${passwordPolicies.minimumUpperCase} uppercase character`,
      predicate: password => password.match(UPPERCASE_REGEX) !== null,
    });
  }

  if (passwordPolicies.minimumNumeric > 0) {
    let regexNumeric = `^(.*?[0-9]){${parseInt(passwordPolicies.minimumNumeric)},}`;
    const NUMERIC_REGEX = new RegExp(regexNumeric);
    passwordPolicyList.push({
      label: `Must have at least ${passwordPolicies.minimumNumeric} numeric character`,
      predicate: password => password.match(NUMERIC_REGEX) !== null,
    });
  }

  if (passwordPolicies.isSpecialCharacterRequired) {
    passwordPolicyList.push({
      label: 'Must have at least 1 special character ',
      predicate: password => password.match(/^(.*\W){1,}/) !== null,
    });
  }

  return (
    <ul style={{ marginTop: '14px' }}>
      {passwordPolicyList.map((passwordPolicy, i) => (
        <li key={i} className={principleClass(passwordPolicy)}>
          {passwordPolicy.label}
        </li>
      ))}
    </ul>
  );
};

export default PasswordPolicyList;
