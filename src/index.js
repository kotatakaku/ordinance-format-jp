// @flow
import DocumentFactory from './factories/document-factory'
import DocumentStructure from './meta/document-structure'
import type Document, { HtmlOptions } from './elements/document'

export function format(markdownText: string, options: HtmlOptions) {
  return new ordinanceFormatJp(markdownText).toHtml(options)
}

export default class ordinanceFormatJp {
  document: Document

  constructor(markdownText: string) {
    const title = markdownText
    this.document = new DocumentFactory().createFromText(markdownText)
  }

  toHtml(options: ?HtmlOptions): string {
    const ds = new DocumentStructure(this.document)
    return this.document.toHtml(ds, options || {})
  }

  toPlainText(): string {
    const ds = new DocumentStructure(this.document)
    return this.document.toPlainText(ds)
  }
}
