// @flow

import Element from './element'
import Item from './item'
import tag from '../utils/tag'
import type { PlainElement } from './element'
import type { PlainItem } from './item'
import type DocumentStructure from '../meta/document-structure'

export type PlainArticle = {
  title?: string
} & PlainElement

/**
 * 条
 */
export default class Article extends Element {
  title: string

  constructor(plain: PlainArticle) {
    super(plain)
    this.title = plain.title || ''
  }

  toHtml(ds: DocumentStructure): string {
    // タイトル部
    const h2 = tag(
      'h2',
      this.title,
      { class: 'articleTitle'}
    )

    const itemsHtml = this.renderItems(ds)
    const appendix = this.renderAppendix()

    return tag(
      'div',
      [h2, itemsHtml, appendix].join('\n'),
      { class: 'article' }
    )
  }

  toPlainText(ds: DocumentStructure): string {
    const num = ds.getNumber(this)
    const title = `第${num}条 ${this.title}`
    let body = this.items.map(item => item.toPlainText(ds)).join('\n')
    if (this.items.length === 1) {
      body = '     ' + body.slice(5)
    }
    return [title, body].join('\n')
  }

  renderItems(ds: DocumentStructure): string {
    if (this.items.length === 0) {
      return ''
    }

    // 項が1つだけなら、<ol>ではなく<div>で囲む
    if (this.items.length === 1) {
      return tag(
        'div',
        this.items[0].toHtml(ds),
        { class: 'articleItems' }
      )
    }

    // itemそれぞれに<li>タグをつけて囲む
    const inner = this.items.map(item => tag(
      'li',
      item.toHtml(ds),
      { class: 'articleItem' }
    )).join('\n')

    return tag(
      'ol',
      inner,
      { class: 'articleItems' }
    )
  }

  // this method should be implemented at Element,
  // but written here to avoid circular dependencies (Element <=> Item)
  constructItems(plainItems?: Array<PlainItem>) {
    this.items = plainItems ? plainItems.map(pItem => new Item(pItem)) : []
  }
}
