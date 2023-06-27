import _ from 'underscore';
import lodashGet from 'lodash/get';
import React from 'react';
import {View, ScrollView} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import Navigation from '../../../libs/Navigation/Navigation';
import ROUTES from '../../../ROUTES';
import ONYXKEYS from '../../../ONYXKEYS';
import styles from '../../../styles/styles';
import Text from '../../../components/Text';
import CONST from '../../../CONST';
import * as User from '../../../libs/actions/User';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Switch from '../../../components/Switch';
import withLocalize, {withLocalizePropTypes} from '../../../components/withLocalize';
import compose from '../../../libs/compose';
import withEnvironment, {environmentPropTypes} from '../../../components/withEnvironment';
import TestToolMenu from '../../../components/TestToolMenu';
import MenuItemWithTopDescription from '../../../components/MenuItemWithTopDescription';

const propTypes = {
    /** The chat priority mode */
    priorityMode: PropTypes.string,

    /** The app's color theme */
    colorTheme: PropTypes.string,

    /** The details about the user that is signed in */
    user: PropTypes.shape({
        /** Whether or not the user is subscribed to news updates */
        isSubscribedToNewsletter: PropTypes.bool,
    }),

    /** The preferred language of the App */
    preferredLocale: PropTypes.string.isRequired,

    ...withLocalizePropTypes,
    ...environmentPropTypes,
};

const defaultProps = {
    priorityMode: CONST.PRIORITY_MODE.DEFAULT,
    colorTheme: CONST.COLOR_THEME.DARK,
    user: {},
};

function PreferencesPage(props) {
    const priorityModes = props.translate('priorityModePage.priorityModes');
    const languages = props.translate('languagePage.languages');
    const colorThemes = props.translate('colorThemePage.colorThemes');

    // Enable additional test features in the staging or dev environments
    const shouldShowTestToolMenu = _.contains([CONST.ENVIRONMENT.STAGING, CONST.ENVIRONMENT.ADHOC, CONST.ENVIRONMENT.DEV], props.environment);

    return (
        <ScreenWrapper includeSafeAreaPaddingBottom={false}>
            <HeaderWithBackButton
                title={props.translate('common.preferences')}
                onBackButtonPress={() => Navigation.goBack(ROUTES.SETTINGS)}
            />
            <ScrollView style={[styles.flex1, styles.mt3]}>
                <View style={styles.mb6}>
                    <Text
                        style={[styles.textLabelSupporting, styles.mb2, styles.ml5, styles.mr8]}
                        numberOfLines={1}
                    >
                        {props.translate('common.notifications')}
                    </Text>
                    <View style={[styles.flexRow, styles.mb4, styles.justifyContentBetween, styles.ml5, styles.mr8]}>
                        <View style={styles.flex4}>
                            <Text>{props.translate('preferencesPage.receiveRelevantFeatureUpdatesAndExpensifyNews')}</Text>
                        </View>
                        <View style={[styles.flex1, styles.alignItemsEnd]}>
                            <Switch
                                accessibilityLabel={props.translate('preferencesPage.receiveRelevantFeatureUpdatesAndExpensifyNews')}
                                isOn={lodashGet(props.user, 'isSubscribedToNewsletter', true)}
                                onToggle={User.updateNewsletterSubscription}
                            />
                        </View>
                    </View>
                    <MenuItemWithTopDescription
                        shouldShowRightIcon
                        title={priorityModes[props.priorityMode].label}
                        description={props.translate('priorityModePage.priorityMode')}
                        onPress={() => Navigation.navigate(ROUTES.SETTINGS_PRIORITY_MODE)}
                    />
                    <MenuItemWithTopDescription
                        shouldShowRightIcon
                        title={languages[props.preferredLocale].label}
                        description={props.translate('languagePage.language')}
                        onPress={() => Navigation.navigate(ROUTES.SETTINGS_LANGUAGE)}
                    />
                    <MenuItemWithTopDescription
                        shouldShowRightIcon
                        title={colorThemes[props.colorTheme].label}
                        description={props.translate('colorThemePage.colorTheme')}
                        onPress={() => Navigation.navigate(ROUTES.SETTINGS_COLOR_THEME)}
                    />

                    {shouldShowTestToolMenu && (
                        <View style={[styles.ml5, styles.mr8, styles.mt6]}>
                            <TestToolMenu />
                        </View>
                    )}
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}

PreferencesPage.propTypes = propTypes;
PreferencesPage.defaultProps = defaultProps;
PreferencesPage.displayName = 'PreferencesPage';

export default compose(
    withEnvironment,
    withLocalize,
    withOnyx({
        priorityMode: {
            key: ONYXKEYS.NVP_PRIORITY_MODE,
        },
        colorTheme: {
            key: ONYXKEYS.COLOR_THEME,
        },
        user: {
            key: ONYXKEYS.USER,
        },
    }),
)(PreferencesPage);
