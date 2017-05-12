<template lang="html">
    <ul class="pagination">
        <li>
            <a href="#" class="pagination__prev" @click.prevent="pageDown"></a>
        </li>
        <li v-for="n in paginationRange">
            <a href="#" class="pagination__item" :class="activePage(n)" @click.prevent="pageChanged(n)">{{ n }}</a>
        </li>
        <li>
            <a href="#" class="pagination__item" v-if="this.currentPage < this.totalPages - 2">...</a>
        </li>
        <li>
            <a href="#" class="pagination__next" @click.prevent="pageUp"></a>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: Number,
        itemsPerPage: Number,
        totalItems: Number,
        visiblePages: {
            type: Number,
            default: 5,

        }
    },
    computed: {

        lastPage () {

            if (this.totalPages) {

                return this.totalPages;

            } else {

                return this.totalItems % this.itemsPerPage === 0
                    ? this.totalItems / this.itemsPerPage
                    : Math.floor(this.totalItems / this.itemsPerPage) + 1;

            }

        },

        paginationRange () {

            let start =
                this.currentPage - this.visiblePages / 2 <= 0
                ? 1 : this.currentPage + this.visiblePages / 2 > this.lastPage
                ? this.lowerBound(this.lastPage - this.visiblePages + 1, 1)
                : Math.ceil(this.currentPage - this.visiblePages / 2);

            let range = [];

            for (let i = 0; i < this.visiblePages && i < this.lastPage; i++) {

                range.push(start + i);

            }

            return range;

        }

    },
    methods: {

        lowerBound (num, limit) {

            return num >= limit ? num : limit;

        },

        activePage (pageNum) {

            return this.currentPage === pageNum ? 'pagination__item--active' : '';

        },

        pageChanged (pageNum) {

            this.$emit('page-changed', pageNum);

        },

        pageDown () {

            this.$emit('page-changed', this.currentPage > 1 ? this.currentPage - 1 : this.currentPage);

        },

        pageUp () {

            this.$emit('page-changed', this.currentPage < this.totalPages ? this.currentPage + 1 : this.currentPage);

        }

    }
}
</script>

<style lang="scss">
.pagination {
    display: flex;
    list-style: none;
    justify-content: center;
    margin: 0 0 20px 0;
    width: 100%;

    .pagination__prev,
    .pagination__next,
    .pagination__item {
        background-color: #FFF;
        box-shadow: 1px 1px 1px rgba(0,0,0,.3);
        display: block;
        height: 40px;
        margin-right: 0.5rem;
        width: 40px;
    }

    .pagination__prev,
    .pagination__next {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 25px 25px;
    }

    .pagination__prev {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAMBJREFUSA3tlTEOgzAMRQ1qBpjLAHeouP8xEHegA51hyND2M0UOip1YbHgijnmPOBGpvv+gC6O+kH2gb4HY4aIWee/pvSwiHAUPVVVQBPg8TbRv25HthyGYjR+zVhDCm7alZ9fFRJZRCzj8NY7knGO4eKgSlMKhEwUWuCiwwkUBCqyRbBE2EZuJE4NjieOJVeVEUgCQVSIKrBKVwCJRC84kn3VFOhlVyY2GjQZc+g/BXCRIfjKbzGoRe1c1vAVim34BKHdeqR6rQwAAAABJRU5ErkJggg==');
    }

    .pagination__next {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAAuUlEQVRIDe3Vrw6DMBAG8IOsAvQQ4x0I7/8YBNtMMsE0ExWDD1XRcH+aOk6VBr5fcj2g+h9FBasumH1G3wDbYVGLPstCIQQ2LHUDCyD87T3N02RCWODZddS0Lf22zYSwgHOOhnE0IyyAvuYgIiAHEQNWRAUA0ZYKwLuAccVEYbJw+DifqxIDlnDAIsAaLgJywkXAd11VPUdoXI/4IrV+9f25jU8Gd6Cp56v7l5lqS7wnGtP4Ae26OLADS8dwFoAf6OoAAAAASUVORK5CYII=');
    }

    .pagination__item {
        color: #BDC3C7;
        font-size: 1.1rem;
        font-weight: bold;
        padding: 10px 0;
        text-align: center;
        text-decoration: none;

        &--active {
            color: #2E3333;
            box-shadow: none;
        }
    }
}
</style>
