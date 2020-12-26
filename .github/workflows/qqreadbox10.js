# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: 开宝箱方案3:计时10min执行

on:
  workflow_dispatc
  schedule:
     - cron: '* */6 * * *'
  watch:
    types: started

jobs:
  build:
    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id
    env:
        QQREAD_BODY: ${{ secrets.QQREAD_BODY }}
        QQREAD_TIMEURL: ${{ secrets.QQREAD_TIMEURL }}
        QQREAD_TIMEHD: ${{ secrets.QQREAD_TIMEHD }}
        
    steps:
      - name: Checkout
        run: |
          git clone https://github.com/chenborming/JavaScript.git ~/JavaScript
      - name: Use Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: 12.x
      - name: npm install
        if: env.QQREAD_TIMEHD
        run: |
          cd ~/JavaScript
          npm install
      - name: '运行 【企鹅读书】'
        if: env.QQREAD_TIMEHD
        run: |
          cd ~/JavaScript
          node Task/qqread10min.js
        env:
          
          PUSH_KEY: ${{ secrets.PUSH_KEY }}
          BARK_PUSH: ${{ secrets.BARK_PUSH }}
          TG_BOT_TOKEN: ${{ secrets.TG_BOT_TOKEN }}
          TG_USER_ID: ${{ secrets.TG_USER_ID }}
          BARK_SOUND: ${{ secrets.BARK_SOUND }}
          DD_BOT_TOKEN: ${{ secrets.DD_BOT_TOKEN }}
          DD_BOT_SECRET: ${{ secrets.DD_BOT_SECRET }}

    
