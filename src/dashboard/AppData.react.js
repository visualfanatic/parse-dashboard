/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import React          from 'react';
import AppSelector    from 'dashboard/AppSelector.react';
import AppsManager    from 'lib/AppsManager';
import { CurrentApp } from 'context/currentApp';
import { withRouter } from 'lib/withRouter';

@withRouter
class AppData extends React.Component {
  render() {
    if (this.props.params.appId === '_') {
      return <AppSelector />;
    }
    //Find by name to catch edge cases around escaping apostrophes in URLs
    let current = AppsManager.findAppBySlugOrName(this.props.params.appId);
    if (current) {
      current.setParseKeys();
    } else {
      this.props.navigate('/apps', { replate: true });
      return <div />;
    }
    return (
      <CurrentApp.Provider value={current}>
        <div>
          {this.props.children}
        </div>
      </CurrentApp.Provider>
    );
  }
}

export default AppData;
