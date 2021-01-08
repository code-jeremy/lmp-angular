(function() {
  'use strict';

  angular
  .module('lmp')
  .component('pagination', {
    bindings: {
      page: '=',
      pages: '=',
      basic: '='
    },
    controller: ['$state', function($state) {
      this.pagination = {
        start: {
          first: false,
          back: false
        },
        middle: [],
        end: {
          next: false,
          last: false
        }
      };

      this.$onInit = () => {
        const pagination = {};
        pagination.total_pages = parseInt(this.pages, 10);
        pagination.page = parseInt(this.page, 10);

        pagination.values = {
          start: {
            first: false,
            back: false
          },
          middle: [],
          end: {
            next: false,
            last: false
          }
        };

        pagination.values.start.first = pagination.page > 1 ? 1 : false;
        pagination.values.start.back = pagination.page > 1 ? pagination.page - 1 : false;
        pagination.values.end.last = pagination.page > 1 ? pagination.page - 1 : false;

        pagination.temp = {
          first: Math.max( 1, (pagination.page - 2) ),
          last: Math.min( ( pagination.page + 2 ), pagination.total_pages )
        };

        if (pagination.page < 3) { 
          pagination.temp.last = Math.min(pagination.total_pages, 5);
        } else if( pagination.page > ( pagination.total_pages - 3)) {
          pagination.temp.first = Math.max(1, (pagination.total_pages - 4));
        }

        for (pagination.temp.current = pagination.temp.first; pagination.temp.current <= pagination.temp.last; pagination.temp.current += 1) {
          pagination.values.middle.push({
            page: pagination.temp.current,
            link: pagination.temp.current == pagination.page ? false : true
          });
        }

        pagination.values.end.next = pagination.page < pagination.total_pages ? pagination.page + 1 : false;
        pagination.values.end.last = pagination.page < pagination.total_pages ? pagination.total_pages : false;

        this.pagination = pagination;
      };
    }],
    templateUrl: '/views/pagination.html',
  });

  function PaginationController($state, ) {
    const ctrl = this;

  }
})();
