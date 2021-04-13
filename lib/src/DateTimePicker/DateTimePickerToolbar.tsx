import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import ToolbarText from '../_shared/ToolbarText';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import DateTimePickerTabs from './DateTimePickerTabs';
import { useUtils } from '../_shared/hooks/useUtils';
import { DateTimePickerView } from './DateTimePicker';
import { ToolbarComponentProps } from '../Picker/Picker';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMeridiemMode } from '../TimePicker/TimePickerToolbar';

export const useStyles = makeStyles(
  _ => ({
    toolbar: {
      paddingLeft: 16,
      paddingRight: 16,
      justifyContent: 'space-around',
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default',
    },
    showingSeconds: {
      '& h5': {
        fontSize: '2.1rem',
      },

      '& h6': {
        fontSize: '1.8rem',
      },
    },
  }),
  { name: 'MuiPickerDTToolbar' }
);

export const DateTimePickerToolbar: React.FC<ToolbarComponentProps> = ({
  views,
  date,
  openView,
  setOpenView,
  ampm,
  hideTabs,
  dateRangeIcon,
  timeIcon,
  onChange,
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const showTabs = !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;
  const { meridiemMode, handleMeridiemChange } = useMeridiemMode(date, ampm, onChange);
  const theme = useTheme();
  const rtl = theme.direction === 'rtl';

  const isSeconds: boolean = !!~views.indexOf('seconds');
  let timeHeading: 'h3' | 'h5' | 'h6';

  if (isSeconds && ampm) {
    timeHeading = 'h6';
  } else if (isSeconds) {
    timeHeading = 'h5';
  } else {
    timeHeading = 'h3';
  }

  return (
    <>
      <PickerToolbar isLandscape={false} className={classes.toolbar}>
        <Grid container justify="center" wrap="nowrap">
          <Grid item container xs={5} justify="flex-start" direction="column">
            <div>
              <ToolbarButton
                variant="subtitle1"
                onClick={() => setOpenView('year')}
                selected={openView === 'year'}
                label={utils.getYearText(date)}
              />
            </div>
            <div>
              <ToolbarButton
                variant="h4"
                onClick={() => setOpenView('date')}
                selected={openView === 'date'}
                label={utils.getDateTimePickerHeaderText(date)}
              />
            </div>
          </Grid>

          <Grid
            item
            container
            xs={6}
            justify="center"
            alignItems="flex-end"
            direction={rtl ? 'row-reverse' : 'row'}
            className={isSeconds ? classes.showingSeconds : ''}
          >
            <ToolbarButton
              variant={timeHeading}
              onClick={() => setOpenView('hours')}
              selected={openView === 'hours'}
              label={utils.getHourText(date, ampm!)}
            />

            <ToolbarText variant={timeHeading} label=":" className={classes.separator} />

            <ToolbarButton
              variant={timeHeading}
              onClick={() => setOpenView('minutes')}
              selected={openView === 'minutes'}
              label={utils.getMinuteText(date)}
            />

            {isSeconds && (
              <>
                <ToolbarText variant={timeHeading} label=":" className={classes.separator} />

                <ToolbarButton
                  variant={timeHeading}
                  onClick={() => setOpenView('seconds')}
                  selected={openView === 'seconds'}
                  label={utils.getSecondText(date)}
                />
              </>
            )}
          </Grid>

          {ampm && (
            <Grid item container xs={1} direction="column" justify="flex-end">
              <ToolbarButton
                variant="subtitle1"
                selected={meridiemMode === 'am'}
                label={utils.getMeridiemText('am')}
                onClick={() => handleMeridiemChange('am')}
              />

              <ToolbarButton
                variant="subtitle1"
                selected={meridiemMode === 'pm'}
                label={utils.getMeridiemText('pm')}
                onClick={() => handleMeridiemChange('pm')}
              />
            </Grid>
          )}
        </Grid>
      </PickerToolbar>

      {showTabs && (
        <DateTimePickerTabs
          dateRangeIcon={dateRangeIcon}
          timeIcon={timeIcon}
          view={openView as DateTimePickerView}
          onChange={setOpenView}
        />
      )}
    </>
  );
};
