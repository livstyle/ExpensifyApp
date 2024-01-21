import type {ForwardedRef} from 'react';
import React, {forwardRef} from 'react';
import type {View} from 'react-native';
import type {AvatarProps, IconProps, MenuItemBaseProps, NoIcon} from './MenuItem';
import MenuItem from './MenuItem';

type FormMenuItemProps = (NoIcon | AvatarProps | IconProps) &
    Omit<MenuItemBaseProps, 'description' | 'error' | 'brickRoadIndicator'> & {
        /** A description text to show under the title provided by the FormProvider */
        value?: string;

        /** Custom value renderer to render description based on form values */
        customValueRenderer?: (value?: string) => string | undefined;
    };

function FormMenuItem({customValueRenderer, value, errorText, ...props}: FormMenuItemProps, ref: ForwardedRef<View>) {
    return (
        <MenuItem
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            ref={ref}
            description={customValueRenderer ? customValueRenderer(value) : value}
            errorText={errorText}
            brickRoadIndicator={errorText && errorText !== '' ? 'error' : undefined}
        />
    );
}

FormMenuItem.displayName = 'FormMenuItem';

export type {FormMenuItemProps};
export default forwardRef(FormMenuItem);
