<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>钢琴识谱</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="400px">
                <template v-slot:activator="{ on }">
<!--                    <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>-->
                    <v-btn
                        color="primary"
                        dark
                        small
                        fab
                        v-on="on"
                    >
                        <v-icon>add</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field
                                        v-model="editedItem.date"
                                        mask="##/##"
                                        label="日期"
                                    ></v-text-field>
                                </v-flex>
<!--                                <v-flex xs6 sm6 md6>-->
<!--                                    <v-text-field-->
<!--                                        v-model="editedItem.time"-->
<!--                                        label="Time"-->
<!--                                    ></v-text-field>-->
<!--                                </v-flex>-->
                                <v-flex xs6 sm6 md6>
<!--                                    <v-autocomplete-->
<!--                                        ref="contenttype"-->
<!--                                        v-model="editedItem.content"-->
<!--                                        :rules="[() => !!contentType || 'This field is required']"-->
<!--                                        :items="contentType"-->
<!--                                        label="Content"-->
<!--                                        placeholder="Select..."-->
<!--                                        required-->
<!--                                        autofocus-->
<!--                                    ></v-autocomplete>-->
                                    <v-text-field
                                            v-model="editedItem.content"
                                            label="内容"
                                    ></v-text-field>

                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field
                                        v-model="editedItem.count"
                                        type='number'
                                        label="数量"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field
                                        v-model="editedItem.score"
                                        type='number'
                                        suffix="%"
                                        label="效果"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">取消</v-btn>
                        <v-btn color="blue darken-1" flat @click="save">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
<!--        <v-data-table-->
<!--                :headers="headers"-->
<!--                :items="desserts"-->
<!--                :search="search"-->
<!--                class="elevation-1"-->
<!--        >-->
        <v-data-table
                :headers="headers"
                :items="this.$store.state.records"
                :search="search"
                class="elevation-1"
        >
            <template v-slot:items="props">
                <td>{{ props.item.date }}</td>
                <td>{{ props.item.content }}</td>
                <td>{{ props.item.count }}</td>
                <td>{{ props.item.score }}</td>
                <td class="justify-center layout px-0">
                    <v-icon
                            small
                            class="mr-2"
                            @click="editItem(props.item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                            small
                            @click="deleteItem(props.item)"
                    >
                        delete
                    </v-icon>
                </td>
            </template>
            <template v-slot:no-data>
<!--                <v-btn color="primary" @click="initialize">Reset</v-btn>-->
                <v-alert :value="true" color="error" icon="warning">
                    Sorry, nothing to display here :(
                </v-alert>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    function getNowDate() {
        let date = new Date();
        // let month = date.getMonth()+ 1;
        // let mm = month < 10 ? '0' + month : month;
        // let dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        // let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        return  month + "/" + day;
    }

    export default {
        data: () => ({
            search: '',
            dialog: false,
            headers: [
                { text: '日期', align: 'left', value: 'date' },
                // { text: '时间', align: 'left', value: 'time' },
                { text: '内容', align: 'left', value: 'content' },
                { text: '数量', align: 'left', value: 'count' },
                { text: '效果', align: 'left', value: 'score' },
                { text: '操作', align: 'left', sortable: false }
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                // date: '',
                // time: '',
                uuid: new Date(),
                date: getNowDate(),
                // time: '',
                content: '',
                count: 0,
                score: 0
            },
            defaultItem: {
                uuid: new Date(),
                date: getNowDate(),
                // time: '',
                content: '',
                count: 0,
                score: 0
            },
            contentType: ['钢琴识谱','数学口算','英语单词'],
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            // this.initialize()
        },

        methods: {
            // initialize () {
            //     this.desserts = [
            //         {
            //             date: '04/01',
            //             // time: '20:00',
            //             content: 'B-2',
            //             count: 24,
            //             score: 99.6
            //         },
            //         {
            //             date: '04/02',
            //             // time: '21:00',
            //             content: 'B-2',
            //             count: 37,
            //             score: 100
            //         },
            //         {
            //             date: '04/03',
            //             // time: '21:04',
            //             content: 'B-2',
            //             count: 23,
            //             score: 80
            //         },
            //         {
            //             date: '04/04',
            //             // time: '18:50',
            //             content: 'B-2',
            //             count: 67,
            //             score: 93
            //         },
            //         {
            //             date: '04/05',
            //             // time: '21:02',
            //             content: 'B-2',
            //             count: 49,
            //             score: 3.9
            //         },
            //         {
            //             date: '04/06',
            //             time: '21:10',
            //             content: 'B-2',
            //             count: 94,
            //             score: 0.0
            //         },
            //         {
            //             date: '04/07',
            //             // time: '21:45',
            //             content: 'B-2',
            //             count: 98,
            //             score: 99
            //         },
            //         {
            //             date: '05/01',
            //             // time: '21:04',
            //             content: 'B-2',
            //             count: 87,
            //             score: 89
            //         },
            //         {
            //             date: '06/01',
            //             // time: '22:00',
            //             content: 'B-2',
            //             count: 51,
            //             score: 97
            //         },
            //         {
            //             date: '08/11',
            //             // time: '21:40',
            //             content: 'B-2',
            //             count: 65,
            //             score: 100
            //         }
            //     ]
            // },

            editItem (item) {
                // this.editedIndex = this.desserts.indexOf(item);
                this.editedIndex = this.$store.state.records.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },

            deleteItem (item) {
                // const index = this.desserts.indexOf(item);
                // confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
                confirm('Are you sure you want to delete this item?') && this.$store.dispatch('removeRecord', item)
            },

            close () {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                // if (this.editedIndex > -1) {
                //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
                // } else {
                //     this.desserts.push(this.editedItem)
                // }
                // this.close()
                if (this.editedIndex > -1) {
                    this.$store.dispatch('editRecord', { index: this.editedIndex, record: this.editedItem })

                } else {
                    this.$store.dispatch('addRecord', this.editedItem)
                }
                this.close()
            }
        }
    }
</script>