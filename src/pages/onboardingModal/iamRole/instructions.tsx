import { List, ListItem, Title } from '@patternfly/react-core';
import CopyClipboard from 'components/copyClipboard';
import React from 'react';
import { InjectedTranslateProps } from 'react-i18next';

const IamRoleInstructions: React.SFC<InjectedTranslateProps> = ({ t }) => {
  return (
    <React.Fragment>
      <Title size="xl">{t('onboarding.iam_role.instructions_title')}</Title>
      <div>{t('onboarding.iam_role.intro')}</div>
      <br />
      <List>
        <ListItem>{t('onboarding.iam_role.create_new_role')}</ListItem>
        <ListItem>
          {t('onboarding.iam_role.paste_account_id')}
          <br />
          <CopyClipboard text="589173575009" aria-label="account id to paste" />
        </ListItem>
        <ListItem>{t('onboarding.iam_role.attach_permissions')}</ListItem>
        <ListItem>{t('onboarding.iam_role.complete_process')}</ListItem>
      </List>
    </React.Fragment>
  );
};

export default IamRoleInstructions;
