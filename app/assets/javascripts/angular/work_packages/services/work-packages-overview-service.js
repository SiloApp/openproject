//-- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2014 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

module.exports = function(WORK_PACKAGE_ATTRIBUTES) {

  var workPackageDetailsAttributes = angular.copy(WORK_PACKAGE_ATTRIBUTES);

  var WorkPackagesOverviewService = {
    getGroupedWorkPackageOverviewAttributes: function() {
      return angular.copy(workPackageDetailsAttributes);
    },
    getGroupAttributesForGroupedAttributes: function(groupName, groupedAttributes) {
      for (var x=0; x < groupedAttributes.length; x++) {
        if (groupedAttributes[x].groupName === groupName) {
          return groupedAttributes[x].attributes;
        }
      }

      return null;
    },
    getGroupAttributes: function(groupName) {
      return this.getGroupAttributesForGroupedAttributes(groupName, workPackageDetailsAttributes);
    },
    addAttributesToGroup: function(groupName, attributes) {
      var groupAttributes = this.getGroupAttributes(groupName);

      if (groupAttributes) {
        angular.forEach(attributes, function(attribute) {
          this.push(attribute);
        }, groupAttributes);
      }
    },
    addAttributeToGroup: function(groupName, attribute, position) {
      var attributes = this.getGroupAttributes(groupName);

      if (attributes) {
        attributes.splice(position, 0, attribute);
      }
    },
    removeAttributeFromGroup: function(groupName, attribute) {
      var attributes = this.getGroupAttributes(groupName);

      if (attributes) {
        var index = attributes.indexOf(attribute);

        if (index >= 0) {
          attributes.splice(index, 1);
        }
      }
    }
  };

  return WorkPackagesOverviewService;
};
