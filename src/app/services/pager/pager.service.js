(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('pagerService', pagerService);

  pagerService.$inject = [];

  function pagerService() {

    var service = {
      getPager: getPager,
      parseLinkHeader: parseLinkHeader
    };

    return service;

    ////////////////////////////////////////////////////////////////////////////

    // Reference: http://jasonwatmore.com/post/2016/01/31/angularjs-pagination-example-with-logic-like-google
    function getPager(totalItems, data, pageSize, currentPage) {
      // default to first page 
      currentPage = currentPage || 1;

      // default page size is 10
      pageSize = pageSize || 10;

      // calculate total pages
      var totalPages = Math.ceil(totalItems / pageSize);

      var startPage, endPage;
      if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
      } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
        } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
        }
      }

      // parse Link header into object
      var pageLinks = parseLinkHeader(data);

      // define each link
      var firstLink = pageLinks.first;
      var lastLink = pageLinks.last;
      var nextLink = pageLinks.next;
      var prevLink = pageLinks.prev;

      // calculate start and end item indexes
      var startIndex = (currentPage - 1) * pageSize;
      var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // create an array of pages to ng-repeat in the pager control
      var pages = _.range(startPage, endPage + 1);

      return {
        totalItems: totalItems,
        firstLink: firstLink,
        lastLink: lastLink,
        nextLink: nextLink,
        prevLink: prevLink,
        totalPages: totalPages,
        pages: pages
      };
    }


    /**
     * Parses link headers and returns as object
     */
    function parseLinkHeader(header) {
      if (header.length === 0) {
        throw new Error("input must not be of zero length");
      }

      // Split parts by comma
      var parts = header.split(',');
      var links = {};
      // Parse each part into a named link
      for (var i = 0; i < parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length !== 2) {
          throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
      }
      return links;
    }

  }
})();
