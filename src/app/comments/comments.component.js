(function() {
  'use strict';

  angular
  .module('lmp')
  .component('comments', {
    bindings: {
      postid: '<',
      type: '<',
      count: '<'
    },
    controller: ['$scope', '$timeout', 'commentsFactory', 'submitCommentFactory', 'authFactory', '$localStorage', '$state', function($scope, $timeout, commentsFactory, submitCommentFactory, authFactory, $localStorage, $state ) {
      this.storage = $localStorage;
      this.list = [];
      this.loading = true;
      this.page = 0;
      this.pages = 0;

      if (authFactory.isAuthenticated()) {
        this.auth = true;
      }

      this.login = () => {
        $localStorage.login_redirect = window.location.pathname;
        $state.go('login');
      }

      this.get_comments = (post, page) => {
        this.loading = true;
        
        commentsFactory.getComments(post, page).then(res => $timeout(() => {
          this.list = res.list;
          this.page = res.page;
          this.pages = res.pages;
          this.count = res.total;
          this.loading = false;
        }));
      };

      this.clear_comment_form = () => this.comment = null;

      this.comment_form_alert = (type, message) => {
        this.comment_form_message = {
          type    : type,
          message   : message
        };
      };

      this.clear_form_alert = () => {
        this.comment_form_message = false;
      };

      this.submit_comment = () => {
        this.loading = true;
        
        const comment = {
          author: this.storage.profile.id,
          content: this.comment,
          post: this.post_id
        };

        submitCommentFactory.postComment(comment).then(res => $timeout(() => {
          if (res.status) {
            switch (res.status) {
              case 'hold':
                this.comment_form_alert('info', 'Your comment must be approved first. After that you can post as often as you like!');
                break;
              case 'approved':
                this.get_comments(this.post_id, 1, true);
                this.comment_form_alert('success', 'Thanks for your comment!');
                break;
              case 'unknown':
                this.comment_form_alert('error', 'Sorry something went wrong, please try again.');
                break;
            }
          } else {
            this.comment_form_alert('error', 'Sorry something went wrong, please try again.');
          }
          
          this.clear_comment_form();
          this.loading = false;
        }));
      };

      this.$onInit = () => {
        this.post_id = this.postid.replace('track-', '');

        this.get_comments(this.post_id, 1, true);
      }
    }],
    templateUrl: '/views/comments.html'
  });
})();
