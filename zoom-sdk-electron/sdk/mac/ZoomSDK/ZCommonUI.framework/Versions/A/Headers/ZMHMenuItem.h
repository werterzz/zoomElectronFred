//
//  ZMHMenuItem.h
//  zChatUI
//
//  Created by Huxley Yang on 2018/1/24.
//  Copyright © 2018年 Zipow. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ZMHMenuItemView.h"
#import "ZMBaseViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface NSView (ZMHMenuItemSubview)

- (void)enclosingMenuItemSelected:(BOOL)selected;//<! To override, called by rowview selection changed

@end

@class ZMHMenu;

typedef BOOL(^ZMHMenuItemBackgroundDrawer)(NSRect bounds, NSRect dirtyRect, BOOL selected);

@interface ZMHMenuItem : ZMBaseViewController <NSUserInterfaceItemIdentification>
//{
//    ZMHMenuItemView *_view;
//}

@property (copy, nonatomic, nullable) NSString *informative;
@property (copy, nonatomic, nullable) NSImage *image;
@property (copy, nonatomic, nullable) NSImage *alternateImage;

@property (nonatomic, retain) NSColor *titleColor;
@property (nonatomic, retain) NSColor *highlightTitleColor;

@property (nonatomic, assign) NSInteger tag;

@property (nullable, assign) id target;
@property (nullable) SEL action;

@property (copy, nonatomic, nullable) NSArray <ZMHMenuItem *> *subItems;
@property (copy, nonatomic, nullable) NSString *subItemsTitle;
@property (assign, nonatomic) ZMHMenu *hmenu;//do not call the setter

@property (class, readonly) ZMHMenuItem *rootItem;
@property (class, readonly) ZMHMenuItem *separatedItem;

@property (readonly, nonatomic) BOOL isRoot;
@property (readonly, nonatomic) BOOL isSeparated;
@property (nonatomic) BOOL canSelect;
@property (nonatomic) BOOL enable;
@property (nullable, copy) ZMHMenuItemBackgroundDrawer backgroundDrawer;

@property (nonatomic, assign) CGFloat minWidth;

+ (instancetype)itemWithTitle:(nullable NSString *)title informative:(nullable NSString *)informative image:(nullable NSImage *)image;

+ (instancetype)itemWithView:(NSView *)customView;//become customViewOnly with zero paddings
+ (instancetype)itemWithView:(NSView *)customView edgePaddings:(NSEdgeInsets)edgePaddings;//become customViewOnly

//MARK: Utils
- (void)performAction;
- (BOOL)locationInFrame:(NSPoint)location from:(NSView *)aView;
//- (void)viewReceivedMouseDown;
- (void)viewReceivedMouseUp;

- (void)adjustToFixedWidth:(float)width;

@property (assign, nonatomic) BOOL selected;

@end
NS_ASSUME_NONNULL_END

