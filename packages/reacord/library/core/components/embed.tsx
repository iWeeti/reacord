import { snakeCaseDeep } from "@reacord/helpers/convert-object-property-case"
import { omit } from "@reacord/helpers/omit"
import React from "react"
import { ReacordElement } from "../../internal/element.js"
import type { MessageOptions } from "../../internal/message"
import { Node } from "../../internal/node.js"
import { TextNode } from "../../internal/text-node"
import { EmbedChildNode } from "./embed-child.js"
import type { EmbedOptions } from "./embed-options"

/**
 * @category Embed
 * @see https://discord.com/developers/docs/resources/channel#embed-object
 */
export interface EmbedProps {
	title?: string
	description?: string
	url?: string
	color?: number
	fields?: { name: string; value: string; inline?: boolean }[]
	author?: { name: string; url?: string; iconUrl?: string }
	thumbnail?: { url: string }
	image?: { url: string }
	video?: { url: string }
	footer?: { text: string; iconUrl?: string }
	timestamp?: string | number | Date
	children?: React.ReactNode
}

/**
 * @category Embed
 * @see https://discord.com/developers/docs/resources/channel#embed-object
 */
export function Embed(props: EmbedProps) {
	return (
		<ReacordElement props={props} createNode={() => new EmbedNode(props)}>
			{props.children}
		</ReacordElement>
	)
}

class EmbedNode extends Node<EmbedProps> {
	override modifyMessageOptions(options: MessageOptions): void {
		const embed: EmbedOptions = {
			...snakeCaseDeep(omit(this.props, ["children", "timestamp"])),
			timestamp: this.props.timestamp
				? new Date(this.props.timestamp).toISOString()
				: undefined,
		}

		for (const child of this.children) {
			if (child instanceof EmbedChildNode) {
				child.modifyEmbedOptions(embed)
			}
			if (child instanceof TextNode) {
				embed.description = (embed.description ?? "") + child.props
			}
		}

		options.embeds.push(embed)
	}
}
