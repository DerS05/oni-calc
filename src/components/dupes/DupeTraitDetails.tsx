import { FC, Fragment, memo } from 'react';

import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import IDupeTrait from '../../interfaces/IDupeTrait';

import ResourceChips from '../resources/ResourceChips';

interface IProps {
  trait: IDupeTrait;
}

export const DupeTraitDetails: FC<IProps> = memo(({ trait }) => {
  return (
    <div css={rootCss}>
      <Typography variant="h6">{trait.name}</Typography>
      {!trait.inputs.length ? null : (
        <Fragment>
          <Typography variant="subtitle1" css={titleCss}>
            Inputs
          </Typography>
          <ResourceChips ios={trait.inputs} />
        </Fragment>
      )}
      {!trait.outputs.length ? null : (
        <Fragment>
          <Typography variant="subtitle1" css={titleCss}>
            Outputs
          </Typography>
          <ResourceChips ios={trait.outputs} />
        </Fragment>
      )}
    </div>
  );
});

const rootCss = (theme: Theme) =>
  css({
    padding: theme.spacing(3),
    minWidth: 400,
  });

const titleCss = (theme: Theme) =>
  css({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(),
  });

export default DupeTraitDetails;
